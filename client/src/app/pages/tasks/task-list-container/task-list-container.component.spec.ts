import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListContainerComponent } from './task-list-container.component';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { Page } from 'src/types/page';
import { Task } from 'src/types/responses/task';
import { TasksService } from 'src/app/services/tasks.service';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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

const mockTasksResponse: Page<Task> = {
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

describe('TaskListContainerComponent', () => {
  let component: TaskListContainerComponent;
  let fixture: ComponentFixture<TaskListContainerComponent>;
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
  const tasksServiceSpy = jasmine.createSpyObj('TasksService', ['getTasks', 'createTaskFilters'], {
    tasksData$: new Subject().asObservable(),
  });
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', ['sendRequest']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskListContainerComponent, NoopAnimationsModule],
      providers: [
        MessageService,
        { provide: ModalDataService, useValue: modalDataServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    TestBed.overrideProvider(TasksService, { useValue: tasksServiceSpy });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockTasksResponse));
    tasksServiceSpy.createTaskFilters.and.returnValue(filterConfig);

    fixture = TestBed.createComponent(TaskListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of tasksData$ and call subscribeToParams', () => {
    spyOn(component, 'subscribeToParams');
    component.ngOnInit();
    expect(component.subscribeToParams).toHaveBeenCalled();
    component.tasksData$.subscribe((res) => expect(res).toEqual(mockTasksResponse));
  });

  it('subscribeToParams should set the values of isLoading and isError and call paramsService.makeRequestOnParamsChange and unsubscribeService.addSubscription', () => {
    component.subscribeToParams();
    expect(paramsServiceSpy.makeRequestOnParamsChange).toHaveBeenCalled();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
    expect(component.isLoading).toEqual(paramsServiceSpy.isLoading);
    expect(component.isError).toEqual(paramsServiceSpy.isError);
  });

  it('updateParams should call paramsService.setNewParamsValue', () => {
    component.updateParams({ search: 'test' });
    expect(paramsServiceSpy.setNewParamsValue).toHaveBeenCalledWith({ search: 'test' });
  });

  it('setTableFilterConfig should set tableFilterConfig with the value returned from tasksService.createTaskFilters()', () => {
    component.setTableFilterConfig();
    expect(tasksServiceSpy.createTaskFilters).toHaveBeenCalled();
    expect(component.tableFilterConfig).toEqual(tasksServiceSpy.createTaskFilters());
  });

  it('onOpenCreateModal should set isCreateModalVisible to true', () => {
    component.onOpenCreateModal();
    expect(component.isCreateModalVisible).toBeTrue();
  });

  it('handleCreateModalClose should set isCreateModalVisible to false', () => {
    component.handleCreateModalClose();
    expect(component.isCreateModalVisible).toBeFalse();
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });
});
