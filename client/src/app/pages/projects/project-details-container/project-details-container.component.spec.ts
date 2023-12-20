import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsContainerComponent } from './project-details-container.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { MessageService } from 'primeng/api';

const mockProjectData = {
  id: 3,
  name: 'New project',
  totalTasks: 41,
  severeTasks: 8,
  assignedTasks: 33,
  tasksNotStarted: 6,
};

describe('ProjectDetailsContainerComponent', () => {
  let component: ProjectDetailsContainerComponent;
  let fixture: ComponentFixture<ProjectDetailsContainerComponent>;
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['putProject']);
  const activatedRouteStub = {
    data: of({ project: mockProjectData }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectDetailsContainerComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }, MessageService],
    });
    TestBed.overrideProvider(ProjectsService, { useValue: projectsServiceSpy });

    fixture = TestBed.createComponent(ProjectDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
