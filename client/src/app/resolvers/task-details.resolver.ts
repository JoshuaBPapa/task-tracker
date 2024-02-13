import { ResolveFn } from '@angular/router';
import { TaskDetailed } from 'src/types/responses/task';
import { ErrorHandlingService } from '../services/error-handling.service';
import { inject } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { catchError } from 'rxjs';

export const taskDetailsResolver: ResolveFn<TaskDetailed> = (route) => {
  const errorHandlingService = inject(ErrorHandlingService);
  return inject(TasksService)
    .getTask(route.paramMap.get('id')!)
    .pipe(catchError((err) => errorHandlingService.handleResolverError(err)));
};
