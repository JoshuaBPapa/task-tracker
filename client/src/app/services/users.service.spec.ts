import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

const mockPostUserValues = {
  firstName: `John`,
  lastName: 'Doe',
  username: 'johndoe',
  authLevel: 1,
  jobTitle: 'Tester',
  password: 'password',
  confirmPassword: 'password',
};

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should place a GET request with the correct url', () => {
    service.getUsers({}).subscribe();
    const req = httpMock.expectOne(`${environment.api}/users`);
    expect(req.request.method).toBe('GET');
  });

  it('getUser should place a GET request with the correct url', () => {
    service.getUser('1').subscribe();
    const req = httpMock.expectOne(`${environment.api}/users/1`);
    expect(req.request.method).toBe('GET');
  });

  it('getUserTasks should place a GET request with the correct url', () => {
    service.getUserTasks({}, 1).subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks/assignedUser/1`);
    expect(req.request.method).toBe('GET');
  });

  it('postUser should place a POST request with the correct url and body', () => {
    service.postUser(mockPostUserValues).subscribe();
    const req = httpMock.expectOne(`${environment.api}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPostUserValues);
  });
});
