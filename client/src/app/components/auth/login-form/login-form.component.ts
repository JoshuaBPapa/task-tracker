import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginForm } from 'src/types/forms/login-form';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { isAlphanumeric } from 'src/app/shared/validators/isAlphanumeric.validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true,
  imports: [SharedModule, LabelledInputComponent],
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<FormGroup<LoginForm>>();

  form = this.nfb.group({
    teamName: ['', Validators.required],
    username: ['', [Validators.required, isAlphanumeric()]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private nfb: NonNullableFormBuilder) {}

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }
}
