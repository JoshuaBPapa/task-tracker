import { ResolveFn } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/types/responses/user';
import { ErrorHandlingService } from '../services/error-handling.service';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';

export const userDetailsResolver: ResolveFn<User> = (route): Observable<User> => {
  const errorHandlingService = inject(ErrorHandlingService);

  return inject(UsersService)
    .getUser(route.paramMap.get('id')!)
    .pipe(catchError((err) => errorHandlingService.handleResolverError(err)));
};
