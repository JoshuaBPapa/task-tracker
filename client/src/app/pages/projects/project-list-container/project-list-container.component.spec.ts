import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListContainerComponent } from './project-list-container.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { Page } from 'src/types/page';
import { Projects } from 'src/types/responses/projects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParamsService } from 'src/app/services/params.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { MessageService } from 'primeng/api';
import { Subject, of } from 'rxjs';

const mockProjectReponse: Page<Projects> = {
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
  const paramsServiceSpy = jasmine.createSpyObj('ParamsService', ['setNewParamsValue']);
  const errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['getProjects'], {
    projectsData$: new Subject().asObservable(),
  });
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectListContainerComponent, HttpClientTestingModule],
      providers: [
        MessageService,
        { provide: ProjectsService, useValue: projectsServiceSpy },
        { provide: ParamsService, useValue: paramsServiceSpy },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy },
        { provide: UnsubscribeService, useValue: unsubscribeServiceSpy },
      ],
    });

    projectsServiceSpy.getProjects.and.returnValue(of(mockProjectReponse));

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
});
