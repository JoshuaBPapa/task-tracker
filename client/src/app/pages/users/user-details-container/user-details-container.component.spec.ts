import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsContainerComponent } from './user-details-container.component';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UsersService } from 'src/app/services/users.service';
import { Page } from 'src/types/page';
import { Task } from 'src/types/responses/task';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const mockUserData = {
  id: 1,
  firstName: `John`,
  lastName: 'Doe',
  username: 'johndoe',
  authLevel: 1,
  jobTitle: 'Tester',
  pictureColour: 'red',
  assignedTasks: 5,
};

const mockUserTasks: Page<Task> = {
  results: [
    {
      id: 1,
      title: 'Task1',
      status: 3,
      priority: 2,
      dateTimeCreated: '2023-07-27T10:41:03.000Z',
      dateTimeUpdated: '2023-11-30T10:07:16.000Z',
      assignedUser: null,
      project: {
        id: 3,
        name: 'New project',
      },
    },
    {
      id: 2,
      title: 'test2',
      status: 1,
      priority: 4,
      dateTimeCreated: '2023-08-02T15:01:00.000Z',
      dateTimeUpdated: '2023-11-30T10:07:37.000Z',
      assignedUser: null,
      project: {
        id: 3,
        name: 'New project',
      },
    },
  ],
  total: 2,
  page: 1,
};

const filterConfig = [
  {
    filterName: 'Status',
    filterKey: 'status',
    options: [
      {
        key: 1,
        label: 'Not Started',
      },
      {
        key: 2,
        label: 'In Progress',
      },
      {
        key: 3,
        label: 'In Review',
      },
      {
        key: 4,
        label: 'Complete',
      },
    ],
  },
  {
    filterName: 'Priority',
    filterKey: 'priority',
    options: [
      {
        key: 1,
        label: 'Low',
      },
      {
        key: 2,
        label: 'Medium',
      },
      {
        key: 3,
        label: 'High',
      },
      {
        key: 4,
        label: 'Severe',
      },
    ],
  },
];

const mockLoggedInUser = {
  firstName: 'John',
  lastName: 'Doe',
  authLevel: 4,
  teamId: 1,
  teamName: 'Mock Team',
  pictureColour: '#7239EA',
  jobTitle: 'CEO',
  userId: 1,
  username: 'JohnDoe',
};

describe('UserDetailsContainerComponent', () => {
  let component: UserDetailsContainerComponent;
  let fixture: ComponentFixture<UserDetailsContainerComponent>;
  const activatedRouteStub = {
    data: of({ user: mockUserData }),
  };
  const paramsServiceSpy = jasmine.createSpyObj(
    'ParamsService',
    ['setNewParamsValue', 'makeRequestOnParamsChange'],
    {
      isLoading: new BehaviorSubject(false),
      isError: new BehaviorSubject(false),
    }
  );
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);
  const tasksServiceSpy = jasmine.createSpyObj('TasksServiceSpy', [
    'postTask',
    'createTaskFilters',
  ]);
  const usersServiceSpy = jasmine.createSpyObj(
    'UsersService',
    ['getUserTasks', 'deleteUser', 'putUser', 'updateUserPassword'],
    {
      userTasksData$: new Subject().asObservable(),
    }
  );
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDetailsContainerComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AuthService, useValue: authServiceSpy },
        MessageService,
      ],
    });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });
    TestBed.overrideProvider(UsersService, { useValue: usersServiceSpy });
    TestBed.overrideProvider(TasksService, { useValue: tasksServiceSpy });

    tasksServiceSpy.createTaskFilters.and.returnValue(filterConfig);
    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockUserTasks));

    fixture = TestBed.createComponent(UserDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of user and userTasksData$ and call subscribeToParams and setTableFilterConfig', () => {
    spyOn(component, 'subscribeToParams');
    spyOn(component, 'setTableFilterConfig');
    component.ngOnInit();
    expect(component.user).toEqual(mockUserData);
    component.userTasksData$.subscribe((res) => expect(res).toEqual(mockUserTasks));
    expect(component.subscribeToParams).toHaveBeenCalled();
    expect(component.setTableFilterConfig).toHaveBeenCalled();
  });

  it('subscribeToParams should set the values of isLoading and isError and call paramsService.makeRequestOnParamsChange and unsubscribeService.addSubscription', () => {
    component.subscribeToParams();
    expect(paramsServiceSpy.makeRequestOnParamsChange).toHaveBeenCalled();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
    expect(component.isTableLoading).toEqual(paramsServiceSpy.isLoading);
    expect(component.isTableError).toEqual(paramsServiceSpy.isError);
  });

  it('setTableFilterConfig should set tableFilterConfig with the value returned from tasksService.createTaskFilters()', () => {
    component.setTableFilterConfig();
    expect(tasksServiceSpy.createTaskFilters).toHaveBeenCalled();
    expect(component.tableFilterConfig).toEqual(tasksServiceSpy.createTaskFilters());
  });

  it('onOpenEditModal should set isEditModalVisible to true', () => {
    component.onOpenEditModal();
    expect(component.isEditModalVisible).toBeTrue();
  });

  it('handleEditModalClose should set isEditModalVisible to false', () => {
    component.handleEditModalClose();
    expect(component.isEditModalVisible).toBeFalse();
  });

  it('onOpenDeleteModal should set isDeleteModalVisible to true', () => {
    component.onOpenDeleteModal();
    expect(component.isDeleteModalVisible).toBeTrue();
  });

  it('handleDeleteModalClose should set isDeleteModalVisible to false', () => {
    component.handleDeleteModalClose();
    expect(component.isDeleteModalVisible).toBeFalse();
  });

  it('onOpenCreateTaskModal should set isCreateTaskModalVisible to true', () => {
    component.onOpenCreateTaskModal();
    expect(component.isCreateTaskModalVisible).toBeTrue();
  });

  it('handleCreateTaskModalClose should set isDeleteProjectModalVisible to false', () => {
    component.handleCreateTaskModalClose();
    expect(component.isCreateTaskModalVisible).toBeFalse();
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });
});
