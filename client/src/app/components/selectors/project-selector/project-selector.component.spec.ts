import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectorComponent } from './project-selector.component';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { Page } from 'src/types/page';
import { Project } from 'src/types/responses/project';
import { FormControl } from '@angular/forms';

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

describe('ProjectSelectorComponent', () => {
  let component: ProjectSelectorComponent;
  let fixture: ComponentFixture<ProjectSelectorComponent>;
  const paramsServiceSpy = jasmine.createSpyObj(
    'ParamsService',
    ['setNewParamsValue', 'makeRequestOnParamsChange'],
    {
      isLoading: new BehaviorSubject(false),
    }
  );
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', [], {
    projectsData$: new Subject().asObservable(),
  });
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectSelectorComponent],
      providers: [MessageService],
    });
    TestBed.overrideProvider(ProjectsService, { useValue: projectsServiceSpy });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockProjectReponse));

    fixture = TestBed.createComponent(ProjectSelectorComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of options$ and call subscribeToParams', () => {
    spyOn(component, 'subscribeToParams');
    component.ngOnInit();
    expect(component.subscribeToParams).toHaveBeenCalled();
    component.options$.subscribe((res) => expect(res).toEqual(mockProjectReponse));
  });

  it('subscribeToParams should set the values of isLoading, call paramsService.makeRequestOnParamsChange and call unsubscribeService.addSubscription', () => {
    component.subscribeToParams();
    expect(paramsServiceSpy.makeRequestOnParamsChange).toHaveBeenCalled();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
    expect(component.isLoading).toEqual(paramsServiceSpy.isLoading);
  });

  it('handleFilter should call paramsService.setNewParamsValue', () => {
    component.handleFilter({ search: 'test' });
    expect(paramsServiceSpy.setNewParamsValue).toHaveBeenCalledWith({ search: 'test' });
  });

  it('handleSelect should call control.setValue and set the value of selectedProjectName', () => {
    spyOn(component.control, 'setValue');
    const mockProject = { id: 1, name: 'Project' };
    component.handleSelect(mockProject as Project);
    expect(component.control.setValue).toHaveBeenCalledWith(mockProject.id);
    expect(component.selectedProjectName).toEqual(mockProject.name);
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });
});
