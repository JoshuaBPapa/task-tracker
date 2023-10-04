import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isAlphanumeric(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const re = new RegExp('^[a-zA-Z0-9]*$');
    const isNotAlphanumeric = !re.test(control.value);
    return isNotAlphanumeric ? { isNotAlphanumeric: true } : null;
  };
}
