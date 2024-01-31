import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postTask should place a POST request with the correct url and body', () => {
    const mockTaskValues = {
      projectId: 1,
      status: 1,
      priority: 1,
      title: 'test',
      description: 'test',
      assignedUserId: null,
    };

    service.postTask(mockTaskValues).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTaskValues);
  });
});
