import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userDetailsResolver } from './user-details.resolver';
import { User } from 'src/types/responses/user';

describe('userDetailsResolver', () => {
  const executeResolver: ResolveFn<User> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => userDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
