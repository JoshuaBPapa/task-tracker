import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelledInputComponent } from '../../inputs/labelled-input/labelled-input.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SignUpForm } from 'src/types/forms/sign-up-form';
import { isAlphanumeric } from 'src/app/shared/validators/isAlphanumeric.validator';
import { passwordsMatch } from 'src/app/shared/validators/passwords-match.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  imports: [SharedModule, LabelledInputComponent],
  standalone: true,
})
export class SignupFormComponent {
  @Output() submitForm = new EventEmitter<FormGroup<SignUpForm>>();

  form = this.nfb.group({
    teamName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    username: ['', [Validators.required, isAlphanumeric()]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, passwordsMatch()]],
  });

  constructor(private nfb: NonNullableFormBuilder) {}

  onSubmit(): void {
    this.submitForm.emit(this.form);
  }
}
