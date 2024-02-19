import { FormControl } from '@angular/forms';

export interface CreateUserForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  authLevel: FormControl<number>;
  jobTitle: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface EditUserForm
  extends Omit<CreateUserForm, 'password' | 'confirmPassword' | 'username'> {}
