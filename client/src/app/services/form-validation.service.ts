import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ServerValidationError } from 'src/types/server-validation-error';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor(private messageService: MessageService) {}

  checkIsFormValid(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      return false;
    }

    return true;
  }

  handleServerValidationErrors(errors: ServerValidationError[], form: FormGroup): void {
    let messageSummary = 'Validation Error';
    let messageDetail = 'Validation failed. Please check all fields are correct';

    errors.forEach((error) => {
      if (error.msg === 'Username or password incorrect') {
        messageSummary = 'Failed to Login';
        messageDetail = error.msg;
      } else {
        form.controls[error.path].setErrors({ serverSideError: error.msg });
      }
    });

    this.messageService.add({
      severity: 'error',
      summary: messageSummary,
      detail: messageDetail,
      key: 'error',
    });
  }
}
