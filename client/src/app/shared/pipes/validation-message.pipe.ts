import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationMessage',
  standalone: true,
})
export class ValidationMessagePipe implements PipeTransform {
  transform(formErrors: ValidationErrors | null): string {
    const defaultMessage = 'Please check if this field is valid';

    if (!formErrors) return defaultMessage;

    const formError = Object.keys(formErrors)[0];
    switch (formError) {
      case 'required':
        return 'This field is required';

      case 'minlength': {
        const { requiredLength } = formErrors[formError];
        return `Must be at least ${requiredLength} characters long`;
      }

      case 'maxlength': {
        const { requiredLength } = formErrors[formError];
        return `Must be at most ${requiredLength} characters long`;
      }

      case 'isNotAlphanumeric':
        return 'Please only enter alphanumeric characters';

      case 'notMatchingPasswords':
        return 'Passwords do not match';

      case 'serverSideError':
        return formErrors['serverSideError'];

      default:
        return defaultMessage;
    }
  }
}
