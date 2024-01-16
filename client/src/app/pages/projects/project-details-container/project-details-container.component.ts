import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterDropdownComponent } from 'src/app/components/filter-dropdown/filter-dropdown.component';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { ProjectFormModalComponent } from 'src/app/components/modals/project-form-modal/project-form-modal.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { CountCardComponent } from 'src/app/components/statistics/count-card/count-card.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { TaskPriorityTagComponent } from 'src/app/components/tags/task-priority-tag/task-priority-tag.component';
import { TaskStatusTagComponent } from 'src/app/components/tags/task-status-tag/task-status-tag.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { UserIconComponent } from 'src/app/components/user/user-icon/user-icon.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ParamsService } from 'src/app/services/params.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { TaskPriorityPipe } from 'src/app/shared/pipes/task-priority.pipe';
import { TaskStatusPipe } from 'src/app/shared/pipes/task-status.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';
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
    FilterDropdownComponent,
    UserIconComponent,
    NamePipe,
  ],
  providers: [ParamsService, UnsubscribeService, TaskStatusPipe, TaskPriorityPipe],
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
  tableFilterConfig: FilterDropdownConfig[];
  tableHeaderConfig = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'assignedUser.firstName',
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
    private unsubscribeService: UnsubscribeService,
    private taskStatusPipe: TaskStatusPipe,
    private taskPriorityPipe: TaskPriorityPipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
    });
    this.projectTasksData$ = this.projectsService.projectTasksData$;
    this.subscribeToParams();
    this.setTableFilterConfig();
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

  setTableFilterConfig(): void {
    const statusFilters: FilterDropdownConfig = {
      filterName: 'Status',
      filterKey: 'status',
      options: [],
    };
    const priorityFilters: FilterDropdownConfig = {
      filterName: 'Priority',
      filterKey: 'priority',
      options: [],
    };

    for (let i = 1; i <= 4; i++) {
      statusFilters.options.push({ key: i, label: this.taskStatusPipe.transform(i, 'text') });
      priorityFilters.options.push({ key: i, label: this.taskPriorityPipe.transform(i, 'text') });
    }

    this.tableFilterConfig = [statusFilters, priorityFilters];
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
