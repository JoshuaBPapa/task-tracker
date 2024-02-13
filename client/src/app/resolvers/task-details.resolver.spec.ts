import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { taskDetailsResolver } from './task-details.resolver';
import { Task } from 'src/types/responses/task';

describe('taskDetailsResolver', () => {
  const executeResolver: ResolveFn<Task> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => taskDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
