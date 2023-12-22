import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { Project } from 'src/types/responses/project';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling.service';

export const projectDetailsResolver: ResolveFn<Project> = (route): Observable<Project> => {
  const errorHandlingService = inject(ErrorHandlingService);

  return inject(ProjectsService)
    .getProject(route.paramMap.get('id')!)
    .pipe(catchError((err) => errorHandlingService.handleResolverError(err)));
};
