import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { ProjectFormModalComponent } from 'src/app/components/modals/project-form-modal/project-form-modal.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { PercentageBarComponent } from 'src/app/components/statistics/percentage-bar/percentage-bar.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { ParamsService } from 'src/app/services/params.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { Projects } from 'src/types/responses/projects';

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
  projectsData$: Observable<Page<Projects>>;
  isLoading = new BehaviorSubject(false);
  isError = new BehaviorSubject(false);
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
    private errorHandlingService: ErrorHandlingService
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

  handleCreatedProject(): void {
    // TODO - link to project details page on creation
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
