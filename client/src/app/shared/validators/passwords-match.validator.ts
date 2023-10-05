import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { parent } = control;

    if (parent) {
      const password = parent.get('password')?.value;
      const confirmPassword = control.value;

      return password !== confirmPassword ? { notMatchingPasswords: true } : null;
    }

    return null;
  };
}
