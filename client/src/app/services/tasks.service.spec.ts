import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

const mockTaskValues = {
  projectId: 1,
  status: 1,
  priority: 1,
  title: 'test',
  description: 'test',
  assignedUserId: null,
};

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
    service.postTask(mockTaskValues).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTaskValues);
  });

  it('getTasks should place a GET request with the correct url', () => {
    service.getTasks({}).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks`);
    expect(req.request.method).toBe('GET');
  });

  it('getTask should place a GET request with the correct url', () => {
    service.getTask('1').subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks/task/1`);
    expect(req.request.method).toBe('GET');
  });

  it('putTask should place a PUT request with the correct url and body', () => {
    service.putTask(mockTaskValues, 1).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockTaskValues);
  });

  it('deleteProject should place a DELETE request with the correct url and id', () => {
    service.deleteTask(1).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
  });

  it('createTaskFilters should return the correct filterConfig', () => {
    expect(service.createTaskFilters()).toEqual([
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
    ]);
  });
});
