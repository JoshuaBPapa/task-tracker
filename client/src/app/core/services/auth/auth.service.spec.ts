import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const mockTokens = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzd3d3d3d3d3ciLCJzdXJuYW1lIjoic3d3d3d3d3d3Iiwiam9iVGl0bGUiOiJzd3d3d3d3d3ciLCJhdXRoTGV2ZWwiOjQsInVzZXJJZCI6MTcsInRlYW1JZCI6MzUsImlhdCI6MTY2MjQ2NTc3NiwiZXhwIjoxNjYyNDY5Mzc2fQ.tG3YRBUHLvBs2-0cO1_wE0fnbHfUSKPliXgBkRp-zo8',
  refreshToken:
    'eeeeeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzd3d3d3d3d3ciLCJzdXJuYW1lIjoic3d3d3d3d3d3Iiwiam9iVGl0bGUiOiJzd3d3d3d3d3ciLCJhdXRoTGV2ZWwiOjQsInVzZXJJZCI6MTcsInRlYW1JZCI6MzUsImlhdCI6MTY2MjQ2NTc3NiwiZXhwIjoxNjYyNDY5Mzc2fQ.tG3YRBUHLvBs2-0cO1_wE0fnbHfUSKPliXgBkRp-zo8e',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    const storage: { [key: string]: any } = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => storage[key] || null);
    spyOn(localStorage, 'removeItem').and.callFake((key) => delete storage[key]);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => (storage[key] = value));
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loginOrSignUp should place a POST request with the correct url and payload', () => {
    const mockLoginPayload = {
      teamName: 'mock value',
      username: 'mock value',
      password: 'mock value',
    };
    const mockSignUpPayload = {
      teamName: 'mock value',
      username: 'mock value',
      password: 'mock value',
      firstName: 'mock value',
      lastName: 'mock value',
      jobTitle: 'mock value',
      confirmPassword: 'mock value',
    };

    service.loginOrSignUp('login', mockLoginPayload).subscribe();
    const loginReq = httpMock.expectOne(`${environment.api}/auth/login`);
    expect(loginReq.request.method).toBe('POST');
    expect(loginReq.request.body).toBe(mockLoginPayload);

    service.loginOrSignUp('sign up', mockSignUpPayload).subscribe();
    const signUpReq = httpMock.expectOne(`${environment.api}/auth/sign-up`);
    expect(signUpReq.request.method).toBe('POST');
    expect(signUpReq.request.body).toBe(mockSignUpPayload);
  });

  it('handleSuccessfulLogin should set localStorage, call setLoggedInUser, and call navigateByUrl with /dashboard.', () => {
    spyOn(service, 'setLoggedInUser');
    service.handleSuccessfulLogin(mockTokens);
    expect(localStorage.getItem('refreshToken')).toEqual(mockTokens.refreshToken);
    expect(localStorage.getItem('accessToken')).toEqual(mockTokens.accessToken);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('setLoggedInUser should set the user if the access token is valid or set to null if not', () => {
    service.setLoggedInUser();
    expect(service.loggedInUser).toBe(null);

    localStorage.setItem('accessToken', mockTokens.accessToken);
    service.setLoggedInUser();
    expect(service.loggedInUser).toBeTruthy();
  });

  it('logout should place a POST request with the correct url and payload and call clearUser', () => {
    spyOn(service, 'clearUser');
    localStorage.setItem('refreshToken', mockTokens.refreshToken);
    service.logout();
    const req = httpMock.expectOne(`${environment.api}/auth/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ refreshToken: mockTokens.refreshToken });
    expect(service.clearUser).toHaveBeenCalled();
  });

  it('clearUser should remove accessToken and refreshToken from localStorage, reset loggedInUser, and navigate to /auth', () => {
    localStorage.setItem('refreshToken', mockTokens.refreshToken);
    localStorage.setItem('accessToken', mockTokens.accessToken);
    service.loggedInUser = {
      userId: 1,
      firstName: 'mock value',
      lastName: 'mock value',
      username: 'mock value',
      jobTitle: 'mock value',
      teamId: 1,
      authLevel: 1,
      teamName: 'mock team',
      pictureColour: 'mock value',
    };
    service.clearUser();
    expect(localStorage.getItem('refreshToken')).toBe(null);
    expect(localStorage.getItem('accessToken')).toBe(null);
    expect(service.loggedInUser as any).toBe(null);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
  });

  it('getNewAccessToken should place a POST request with the correct url and payload', () => {
    const mockPayload = 'refresh token';
    service.getNewAccessToken(mockPayload).subscribe();
    const req = httpMock.expectOne(`${environment.api}/auth/token`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ refreshToken: mockPayload });
  });
});
