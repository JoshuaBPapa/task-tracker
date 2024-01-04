import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { Params } from 'src/types/params/params';
import { ErrorHandlingService } from './error-handling.service';

type ReqMethod = (params: Params, ...reqMethodArguments: unknown[]) => Observable<unknown>;

@Injectable()
export class ParamsService {
  private params = new BehaviorSubject<Params>({});
  isLoading = new BehaviorSubject(false);
  isError = new BehaviorSubject(false);

  constructor(private errorHandlingService: ErrorHandlingService) {}

  getParamsValue(): Params {
    return this.params.value;
  }

  setNewParamsValue(params: Params, resetPagination: boolean = true): void {
    const newParams = { ...this.getParamsValue(), ...params };
    if (!params.hasOwnProperty('page') && resetPagination) {
      newParams.page = 1;
    }
    this.params.next(newParams);
  }

  makeRequestOnParamsChange(reqMethod: ReqMethod): Observable<unknown> {
    return this.params.pipe(
      tap(() => this.isLoading.next(true)),
      switchMap((params) => {
        return reqMethod(params).pipe(
          catchError((err) => {
            this.isError.next(true);
            return this.errorHandlingService.handleError(err, this.isLoading);
          })
        );
      }),
      tap(() => {
        this.isLoading.next(false);
        this.isError.next(false);
      })
    );
  }
}
