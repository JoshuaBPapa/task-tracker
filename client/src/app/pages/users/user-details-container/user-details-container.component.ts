import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterDropdownComponent } from 'src/app/components/filter-dropdown/filter-dropdown.component';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { TaskFormModalComponent } from 'src/app/components/modals/task-form-modal/task-form-modal.component';
import { UpdatePasswordFormModalComponent } from 'src/app/components/modals/update-password-form-modal/update-password-form-modal.component';
import { UserFormModalComponent } from 'src/app/components/modals/user-form-modal/user-form-modal.component';
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
import { UsersService } from 'src/app/services/users.service';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';
import { AuthLevelPipe } from 'src/app/shared/pipes/auth-level.pipe';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';
import { TaskForm } from 'src/types/forms/task-form';
import { UpdatePasswordForm } from 'src/types/forms/update-password-form';
import { CreateUserForm, EditUserForm } from 'src/types/forms/user-form';
import { Page } from 'src/types/page';
import { Task } from 'src/types/responses/task';
import { User } from 'src/types/responses/user';

@Component({
  selector: 'app-user-details-container',
  standalone: true,
  imports: [
    SharedModule,
    NamePipe,
    AuthLevelPipe,
    UserIconComponent,
    ToolbarComponent,
    TaskFormModalComponent,
    SearchInputComponent,
    FilterDropdownComponent,
    DataTableComponent,
    PaginatorComponent,
    TaskStatusTagComponent,
    TaskPriorityTagComponent,
    TextTruncateDirective,
    DeleteModalComponent,
    UserFormModalComponent,
    UpdatePasswordFormModalComponent,
  ],
  providers: [ParamsService, TasksService, UnsubscribeService],
  templateUrl: './user-details-container.component.html',
  styleUrls: ['./user-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsContainerComponent implements OnInit, OnDestroy {
  user: User;
  isCreateTaskModalVisible = false;
  tableFilterConfig: FilterDropdownConfig[];
  isTableLoading: BehaviorSubject<boolean>;
  isTableError: BehaviorSubject<boolean>;
  isDeleteModalVisible = false;
  isEditModalVisible = false;
  isUpdatePwModalVisible = false;
  userTasksData$: Observable<Page<Task>>;
  tableHeaderConfig = [
    {
      key: 'title',
      label: 'Title',
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
    private activatedRoute: ActivatedRoute,
    private paramsService: ParamsService,
    private formValidationService: FormValidationService,
    private modalDataService: ModalDataService,
    private tasksService: TasksService,
    private router: Router,
    private unsubscribeService: UnsubscribeService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user;
    });
    this.userTasksData$ = this.usersService.userTasksData$;
    this.setTableFilterConfig();
    this.subscribeToParams();
  }

  setTableFilterConfig(): void {
    this.tableFilterConfig = this.tasksService.createTaskFilters();
  }

  subscribeToParams(): void {
    this.isTableLoading = this.paramsService.isLoading;
    this.isTableError = this.paramsService.isError;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) =>
        this.usersService.getUserTasks(params, this.user.id)
      )
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  updateParams(params: Params): void {
    this.paramsService.setNewParamsValue(params);
  }

  onOpenCreateTaskModal(): void {
    this.isCreateTaskModalVisible = true;
  }

  handleCreateTaskModalClose(): void {
    this.isCreateTaskModalVisible = false;
  }

  handleCreateTaskModalSubmit(form: FormGroup<TaskForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(this.tasksService.postTask(formValue), 'Task Created', form)
      .subscribe(({ id }) => {
        this.handleCreateTaskModalClose();
        this.router.navigateByUrl(`/tasks/${id}`);
      });
  }

  onOpenDeleteModal(): void {
    this.isDeleteModalVisible = true;
  }

  handleDeleteModalClose(): void {
    this.isDeleteModalVisible = false;
  }

  handleDeleteModalConfirm(): void {
    this.modalDataService
      .sendRequest(this.usersService.deleteUser(this.user.id), 'User Deleted')
      .subscribe(() => {
        this.handleDeleteModalClose();
        this.router.navigateByUrl('/users');
      });
  }

  onOpenEditModal(): void {
    this.isEditModalVisible = true;
  }

  handleEditModalClose(): void {
    this.isEditModalVisible = false;
  }

  handleEditModalSubmit(form: FormGroup<EditUserForm> | FormGroup<CreateUserForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(this.usersService.putUser(formValue, this.user.id), 'User Updated', form)
      .subscribe(() => {
        this.handleEditModalClose();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/users/${this.user.id}`);
        });
      });
  }

  onOpenUpdatePwModal(): void {
    this.isUpdatePwModalVisible = true;
  }

  handleUpdatePwModalClose(): void {
    this.isUpdatePwModalVisible = false;
  }

  handleUpdatePwModalSubmit(form: FormGroup<UpdatePasswordForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();

    this.modalDataService
      .sendRequest(
        this.usersService.updateUserPassword(formValue, this.user.id),
        'Password Updated',
        form
      )
      .subscribe(() => this.handleUpdatePwModalClose());
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
