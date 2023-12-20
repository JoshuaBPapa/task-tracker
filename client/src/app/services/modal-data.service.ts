import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({ providedIn: 'root' })
export class ModalDataService {
  isLoading = new BehaviorSubject(false);

  constructor(
    private messageService: MessageService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  sendRequest(request: Observable<unknown>, msg: string, form?: FormGroup): Observable<any> {
    this.isLoading.next(true);
    const message = {
      severity: 'success',
      key: 'success',
      summary: 'Success',
      detail: msg,
    };

    return request.pipe(
      catchError((err) => this.errorHandlingService.handleError(err, this.isLoading, form)),
      tap(() => {
        this.isLoading.next(false);
        this.messageService.add(message);
      })
    );
  }
}
