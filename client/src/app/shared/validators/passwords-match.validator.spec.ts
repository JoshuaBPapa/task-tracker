import { FormControl, FormGroup } from '@angular/forms';
import { passwordsMatch } from './passwords-match.validator';

describe('password-match', () => {
  const form = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('', passwordsMatch()),
  });

  it('should be a valid control if password equals confirmPassword', () => {
    form.controls.password.setValue('test');
    form.controls.confirmPassword.setValue('test');
    expect(form.controls.confirmPassword.valid).toBeTrue();
  });

  it('should be an invalid control if password does not equals confirmPassword', () => {
    form.controls.confirmPassword.setValue('fail test');
    expect(form.controls.confirmPassword.valid).toBeFalse();
  });
});
