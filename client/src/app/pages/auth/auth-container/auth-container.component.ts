import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError } from 'rxjs';
import { LoginFormComponent } from 'src/app/components/auth/login-form/login-form.component';
import { SignupFormComponent } from 'src/app/components/auth/signup-form/signup-form.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginForm } from 'src/types/forms/login-form';
import { SignUpForm } from 'src/types/forms/sign-up-form';
import { HttpError } from 'src/types/http-error';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  standalone: true,
  imports: [LoginFormComponent, SignupFormComponent, SharedModule, LoadingSpinnerComponent],
})
export class AuthContainerComponent {
  formType: 'login' | 'sign up' = 'login';
  isLoading = new BehaviorSubject(false);

  constructor(
    private authService: AuthService,
    private formValidationService: FormValidationService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  changeFormType(): void {
    if (this.formType === 'login') this.formType = 'sign up';
    else this.formType = 'login';
  }

  handleSubmit(form: FormGroup<LoginForm> | FormGroup<SignUpForm>): void {
    if (!this.formValidationService.checkIsFormValid(form)) return;
    const formValue = form.getRawValue();
    this.isLoading.next(true);
    this.authService
      .loginOrSignUp(this.formType, formValue)
      .pipe(
        catchError((error: HttpError) =>
          this.errorHandlingService.handleError(error, this.isLoading, form)
        )
      )
      .subscribe((tokens) => {
        this.authService.handleSuccessfulLogin(tokens);
        this.isLoading.next(false);
      });
  }
}
