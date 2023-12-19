import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { projectDetailsResolver } from './project-details.resolver';
import { Project } from 'src/types/responses/project';

describe('projectDetailsResolver', () => {
  const executeResolver: ResolveFn<Project> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => projectDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
