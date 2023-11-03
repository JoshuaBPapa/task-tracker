import { FormControl } from '@angular/forms';
import { LoginForm } from './login-form';

export interface SignUpForm extends LoginForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  confirmPassword: FormControl<string>;
  jobTitle: FormControl<string>;
}
