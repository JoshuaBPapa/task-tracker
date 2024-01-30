import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListContainerComponent } from './project-list-container.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { Page } from 'src/types/page';
import { Project } from 'src/types/responses/project';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ModalDataService } from 'src/app/services/modal-data.service';

const mockProjectReponse: Page<Project> = {
  results: [
    {
      id: 3,
      name: 'New project',
      totalTasks: 41,
      severeTasks: 8,
      assignedTasks: 33,
      tasksNotStarted: 6,
    },
    {
      id: 4,
      name: 'New project',
      totalTasks: 0,
      severeTasks: 0,
      assignedTasks: 0,
      tasksNotStarted: 0,
    },
  ],
  total: 2,
  page: 1,
};

describe('ProjectListContainerComponent', () => {
  let component: ProjectListContainerComponent;
  let fixture: ComponentFixture<ProjectListContainerComponent>;
  const paramsServiceSpy = jasmine.createSpyObj(
    'ParamsService',
    ['setNewParamsValue', 'makeRequestOnParamsChange'],
    {
      isLoading: new BehaviorSubject(false),
      isError: new BehaviorSubject(false),
    }
  );
  const projectsServiceSpy = jasmine.createSpyObj(
    'ProjectsService',
    ['getProjects', 'postProject'],
    {
      projectsData$: new Subject().asObservable(),
    }
  );
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', ['sendRequest']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectListContainerComponent],
      providers: [MessageService, { provide: ModalDataService, useValue: modalDataServiceSpy }],
    });
    TestBed.overrideProvider(ProjectsService, { useValue: projectsServiceSpy });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockProjectReponse));

    fixture = TestBed.createComponent(ProjectListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of projectsData$ and call subscribeToParams', () => {
    spyOn(component, 'subscribeToParams');
    component.ngOnInit();
    expect(component.subscribeToParams).toHaveBeenCalled();
    component.projectsData$.subscribe((res) => expect(res).toEqual(mockProjectReponse));
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

  it('onOpenCreateModal should set isCreateModalVisible as true', () => {
    component.onOpenCreateModal();
    expect(component.isCreateModalVisible).toBeTrue();
  });

  it('handleCreateModalClose should set isCreateModalVisible as false', () => {
    component.handleCreateModalClose();
    expect(component.isCreateModalVisible).toBeFalse();
  });
});
