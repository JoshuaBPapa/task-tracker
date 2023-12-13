import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Params } from 'src/types/params/params';

@Injectable()
export class ParamsService {
  private params = new BehaviorSubject<Params>({});
  params$ = this.params.asObservable();

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
}
