import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { ProjectFormModalComponent } from 'src/app/components/modals/project-form-modal/project-form-modal.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { CountCardComponent } from 'src/app/components/statistics/count-card/count-card.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { TaskPriorityTagComponent } from 'src/app/components/tags/task-priority-tag/task-priority-tag.component';
import { TaskStatusTagComponent } from 'src/app/components/tags/task-status-tag/task-status-tag.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ParamsService } from 'src/app/services/params.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectForm } from 'src/types/forms/project-form';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { Project } from 'src/types/responses/project';
import { Task } from 'src/types/responses/task';

@Component({
  selector: 'app-project-details-container',
  standalone: true,
  imports: [
    SharedModule,
    CountCardComponent,
    ProjectFormModalComponent,
    DeleteModalComponent,
    DataTableComponent,
    TaskStatusTagComponent,
    TaskPriorityTagComponent,
    PaginatorComponent,
    SearchInputComponent,
    ToolbarComponent,
  ],
  providers: [ParamsService, UnsubscribeService],
  templateUrl: './project-details-container.component.html',
  styleUrls: ['./project-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsContainerComponent implements OnInit, OnDestroy {
  project: Project;
  isEditProjectModalVisible = false;
  isDeleteProjectModalVisible = false;
  projectTasksData$: Observable<Page<Task>>;
  isTableLoading: BehaviorSubject<boolean>;
  isTableError: BehaviorSubject<boolean>;
  tableHeaderConfig = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'assignedUserId',
      label: 'Assigned User',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'priority',
      label: 'Priority',
    },
    {
      key: 'datetimeCreated',
      label: 'Created',
    },
    {
      key: 'datetimeUpdated',
      label: 'Updated',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router,
    private formValidationService: FormValidationService,
    private modalDataService: ModalDataService,
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
    });
    this.projectTasksData$ = this.projectsService.projectTasksData$;
    this.subscribeToParams();
  }

  subscribeToParams(): void {
    this.isTableLoading = this.paramsService.isLoading;
    this.isTableError = this.paramsService.isError;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) =>
        this.projectsService.getProjectTasks(params, this.project.id)
      )
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  onOpenEditProjectModal(): void {
    this.isEditProjectModalVisible = true;
  }

  handleEditProjectModalClose(): void {
    this.isEditProjectModalVisible = false;
  }

  handleEditProjectModalSubmit(form: FormGroup<ProjectForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(
        this.projectsService.putProject(formValue, this.project.id),
        'Project Updated',
        form
      )
      .subscribe(() => {
        this.handleEditProjectModalClose();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/projects/${this.project.id}`);
        });
      });
  }

  openDeleteProjectModal(): void {
    this.isDeleteProjectModalVisible = true;
  }

  handleDeleteProjectModalClose(): void {
    this.isDeleteProjectModalVisible = false;
  }

  handleDeleteProjectModalConfirm(): void {
    this.modalDataService
      .sendRequest(this.projectsService.deleteProject(this.project.id), 'Project Deleted')
      .subscribe(() => {
        this.handleDeleteProjectModalClose();
        this.router.navigateByUrl('/projects');
      });
  }

  updateParams(params: Params): void {
    this.paramsService.setNewParamsValue(params);
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
