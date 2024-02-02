import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsContainerComponent } from './project-details-container.component';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Page } from 'src/types/page';
import { Task } from 'src/types/responses/task';

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

const mockProjectData = {
  id: 3,
  name: 'New project',
  totalTasks: 41,
  severeTasks: 8,
  assignedTasks: 33,
  tasksNotStarted: 6,
};

const mockProjectTasks: Page<Task> = {
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

describe('ProjectDetailsContainerComponent', () => {
  let component: ProjectDetailsContainerComponent;
  let fixture: ComponentFixture<ProjectDetailsContainerComponent>;
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['putProject'], {
    projectTasksData$: new Subject().asObservable(),
  });
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
  const activatedRouteStub = {
    data: of({ project: mockProjectData }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectDetailsContainerComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        MessageService,
        provideHttpClient(),
      ],
    });
    TestBed.overrideProvider(ProjectsService, { useValue: projectsServiceSpy });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });
    TestBed.overrideProvider(TasksService, { useValue: tasksServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockProjectTasks));
    tasksServiceSpy.createTaskFilters.and.returnValue(filterConfig);

    fixture = TestBed.createComponent(ProjectDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of project and projectTasksData$ and call subscribeToParams and setTableFilterConfig', () => {
    spyOn(component, 'subscribeToParams');
    spyOn(component, 'setTableFilterConfig');
    component.ngOnInit();
    expect(component.project).toEqual(mockProjectData);
    component.projectTasksData$.subscribe((res) => expect(res).toEqual(mockProjectTasks));
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

  it('onOpenEditProjectModal should set isEditProjectModalVisible to true', () => {
    component.onOpenEditProjectModal();
    expect(component.isEditProjectModalVisible).toBeTrue();
  });

  it('handleEditProjectModalClose should set isEditProjectModalVisible to false', () => {
    component.handleEditProjectModalClose();
    expect(component.isEditProjectModalVisible).toBeFalse();
  });

  it('openDeleteProjectModal should set isDeleteProjectModalVisible to true', () => {
    component.openDeleteProjectModal();
    expect(component.isDeleteProjectModalVisible).toBeTrue();
  });

  it('handleDeleteProjectModalClose should set isDeleteProjectModalVisible to false', () => {
    component.handleDeleteProjectModalClose();
    expect(component.isDeleteProjectModalVisible).toBeFalse();
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
