import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['clearUser', 'getNewAccessToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, { provide: AuthService, useValue: authServiceSpy }],
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
