import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterDropdownComponent } from 'src/app/components/filter-dropdown/filter-dropdown.component';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { NoTasksMessageComponent } from 'src/app/components/messages/no-tasks-message/no-tasks-message.component';
import { TaskFormModalComponent } from 'src/app/components/modals/task-form-modal/task-form-modal.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { TaskPriorityTagComponent } from 'src/app/components/tags/task-priority-tag/task-priority-tag.component';
import { TaskStatusTagComponent } from 'src/app/components/tags/task-status-tag/task-status-tag.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { UserIconComponent } from 'src/app/components/user/user-icon/user-icon.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ParamsService } from 'src/app/services/params.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { TableCellLinkDirective } from 'src/app/shared/directives/table-cell-link.directive';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';
import { TaskForm } from 'src/types/forms/task-form';
import { Page } from 'src/types/page';
import { Task } from 'src/types/responses/task';

@Component({
  selector: 'app-task-list-container',
  standalone: true,
  imports: [
    SharedModule,
    DataTableComponent,
    UserIconComponent,
    NamePipe,
    TaskStatusTagComponent,
    TaskPriorityTagComponent,
    PaginatorComponent,
    FilterDropdownComponent,
    SearchInputComponent,
    ToolbarComponent,
    TaskFormModalComponent,
    NoTasksMessageComponent,
    TextTruncateDirective,
    TableCellLinkDirective,
  ],
  providers: [ParamsService, UnsubscribeService, TasksService],
  templateUrl: './task-list-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListContainerComponent implements OnInit, OnDestroy {
  tasksData$: Observable<Page<Task>>;
  isLoading: BehaviorSubject<boolean>;
  isError: BehaviorSubject<boolean>;
  tableFilterConfig: FilterDropdownConfig[];
  isCreateModalVisible = false;
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
      key: 'project.name',
      label: 'Project',
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
    private tasksService: TasksService,
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService,
    private formValidationService: FormValidationService,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit(): void {
    this.tasksData$ = this.tasksService.tasksData$;
    this.subscribeToParams();
    this.setTableFilterConfig();
  }

  subscribeToParams(): void {
    this.isLoading = this.paramsService.isLoading;
    this.isError = this.paramsService.isError;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) => this.tasksService.getTasks(params))
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  setTableFilterConfig(): void {
    this.tableFilterConfig = this.tasksService.createTaskFilters();
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

  handleCreateModalSubmit(form: FormGroup<TaskForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(this.tasksService.postTask(formValue), 'Task Created', form)
      .subscribe(() => {
        this.handleCreateModalClose();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
