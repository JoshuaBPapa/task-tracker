import { FormControl } from '@angular/forms';

export interface UpdatePasswordForm {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
