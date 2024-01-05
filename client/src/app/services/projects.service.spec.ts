import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsService],
    });
    service = TestBed.inject(ProjectsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProjects should place a GET request with the correct url', () => {
    service.getProjects({}).subscribe();
    const req = httpMock.expectOne(`${environment.api}/projects`);
    expect(req.request.method).toBe('GET');
  });

  it('postProject should place a POST request with the correct url and body', () => {
    service.postProject({ name: 'mock project' }).subscribe();
    const req = httpMock.expectOne(`${environment.api}/projects`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'mock project' });
  });

  it('getProject should place a GET request with the correct url', () => {
    service.getProject('2').subscribe();
    const req1 = httpMock.expectOne(`${environment.api}/projects/2`);
    expect(req1.request.method).toBe('GET');

    service.getProject('3').subscribe();
    const req2 = httpMock.expectOne(`${environment.api}/projects/3`);
    expect(req2.request.method).toBe('GET');
  });

  it('putProject should place a POST request with the correct url, id, and body', () => {
    service.putProject({ name: 'mock project' }, 1).subscribe();
    const req = httpMock.expectOne(`${environment.api}/projects/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ name: 'mock project' });
  });

  it('deleteProject should place a DELETE request with the correct url and id', () => {
    service.deleteProject(1).subscribe();
    const req = httpMock.expectOne(`${environment.api}/projects/1`);
    expect(req.request.method).toBe('DELETE');
  });

  it('getProjectTasks should place a GET request with the correct url and id', () => {
    service.getProjectTasks({}, 1).subscribe();
    const req1 = httpMock.expectOne(`${environment.api}/tasks/project/1`);
    expect(req1.request.method).toBe('GET');

    service.getProjectTasks({}, 2).subscribe();
    const req2 = httpMock.expectOne(`${environment.api}/tasks/project/2`);
    expect(req2.request.method).toBe('GET');
  });
});
