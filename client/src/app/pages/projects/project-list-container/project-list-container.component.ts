import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { ProjectFormModalComponent } from 'src/app/components/modals/project-form-modal/project-form-modal.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { PercentageBarComponent } from 'src/app/components/statistics/percentage-bar/percentage-bar.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ParamsService } from 'src/app/services/params.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectForm } from 'src/types/forms/project-form';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { CreatedResponse } from 'src/types/responses/created-response';
import { Project } from 'src/types/responses/project';

@Component({
  selector: 'app-project-list-container',
  standalone: true,
  imports: [
    SharedModule,
    DataTableComponent,
    PercentageBarComponent,
    SearchInputComponent,
    LoadingSpinnerComponent,
    PaginatorComponent,
    ProjectFormModalComponent,
  ],
  providers: [ProjectsService, ParamsService, UnsubscribeService, ErrorHandlingService],
  templateUrl: './project-list-container.component.html',
  styleUrls: ['./project-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListContainerComponent implements OnInit, OnDestroy {
  projectsData$: Observable<Page<Project>>;
  isLoading = new BehaviorSubject(false);
  isError = new BehaviorSubject(false);
  isCreateModalVisible = false;
  tableHeaderConfig = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'totalTasks',
      label: 'Total Tasks',
    },
    {
      key: 'severeTasks',
      label: 'Severe Tasks',
    },
    {
      key: 'assignedTasks',
      label: 'Tasks Assigned',
    },
    {
      key: 'tasksNotStarted',
      label: 'Tasks not Started',
    },
  ];

  constructor(
    private projectsService: ProjectsService,
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService,
    private errorHandlingService: ErrorHandlingService,
    private modalDataService: ModalDataService,
    private formValidationService: FormValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectsData$ = this.projectsService.projectsData$;
    this.subscribeToParams();
  }

  subscribeToParams(): void {
    const paramSub = this.paramsService.params$
      .pipe(
        tap(() => this.isLoading.next(true)),
        switchMap((params) => {
          return this.projectsService.getProjects(params).pipe(
            catchError((err) => {
              this.isError.next(true);
              return this.errorHandlingService.handleError(err, this.isLoading);
            })
          );
        }),
        tap(() => {
          this.isLoading.next(false);
          this.isError.next(false);
        })
      )
      .subscribe();
    this.unsubscribeService.addSubscription(paramSub);
  }

  updateParams(params: Params): void {
    this.paramsService.setNewParamsValue(params);
  }

  onOpenCreateModal(): void {
    this.isCreateModalVisible = true;
  }

  handleCreateModalClose(): void {
    this.isCreateModalVisible = false;
  }

  handleCreateModalSubmit(form: FormGroup<ProjectForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(this.projectsService.postProject(formValue), 'Project Updated', form)
      .subscribe((res: CreatedResponse) => {
        this.handleCreateModalClose();
        this.router.navigateByUrl(`/projects/${res.id}`);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
