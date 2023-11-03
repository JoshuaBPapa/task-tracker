import { FormControl } from '@angular/forms';

export interface LoginForm {
  teamName: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}
