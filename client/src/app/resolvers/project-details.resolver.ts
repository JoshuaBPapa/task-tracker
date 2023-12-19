import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { Project } from 'src/types/responses/project';
import { Observable } from 'rxjs';

export const projectDetailsResolver: ResolveFn<Project> = (route): Observable<Project> => {
  return inject(ProjectsService).getProject(route.paramMap.get('id')!);
};
