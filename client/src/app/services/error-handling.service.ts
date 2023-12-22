import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { HttpError } from 'src/types/http-error';
import { FormValidationService } from './form-validation.service';
import { ServerValidationError } from 'src/types/server-validation-error';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(
    private messageService: MessageService,
    private formValidationService: FormValidationService,
    private router: Router
  ) {}

  handleError(
    errorResponse: HttpError,
    isLoading?: BehaviorSubject<boolean>,
    form?: FormGroup
  ): Observable<never> {
    const { error } = errorResponse;
    isLoading && isLoading.next(false);
    this.messageService.clear();

    if (error.message === 'Validation failed' && form) {
      const validationErrors = error.furtherInformation.validationErrors as ServerValidationError[];
      this.formValidationService.handleServerValidationErrors(validationErrors, form);
      // handleServerValidationErrors displays its own error message so calling this.showErrorMessage is unnecessary
    } else {
      this.showErrorMessage(error.status, error.message);
    }

    return EMPTY;
  }

  showErrorMessage(status: number, statusText: string): void {
    const messageConfig = {
      severity: 'error',
      summary: `Error: ${status || 500}`,
      detail: statusText || 'Unknown Error. Please try again',
      key: 'error',
    };
    this.messageService.add(messageConfig);
  }

  handleResolverError(errorResponse: HttpError): Observable<never> {
    const { error } = errorResponse;

    let message = 'Error: Unknown Error';
    if (error.message && error.status) {
      message = `Error: ${error.status} - ${error.message}`;
    }

    this.router.navigateByUrl('/error', {
      state: { message },
      skipLocationChange: true,
    });

    return EMPTY;
  }
}
