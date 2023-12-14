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
});
