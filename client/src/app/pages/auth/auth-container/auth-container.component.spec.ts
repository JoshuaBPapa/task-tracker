import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContainerComponent } from './auth-container.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

const mockTokens = {
  accessToken: 'test',
  refreshToken: 'test',
};

describe('AuthContainerComponent', () => {
  let component: AuthContainerComponent;
  let fixture: ComponentFixture<AuthContainerComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', [
    'loginOrSignUp',
    'handleSuccessfulLogin',
    'loginWithDemoTeam',
  ]);
  const formValidationServiceSpy = jasmine.createSpyObj('FormValidationService', [
    'checkIsFormValid',
  ]);
  const errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthContainerComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: FormValidationService, useValue: formValidationServiceSpy },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(AuthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeFormType should change the formType to the expected value', () => {
    expect(component.formType).toBe('login');

    component.changeFormType();
    expect(component.formType).toBe('sign up');

    component.changeFormType();
    expect(component.formType).toBe('login');
  });

  it('handleSubmit should call formValidationService.checkIsFormValid with the form, authService.loginOrSignUp with the correct arguments, and then authService.handleSuccessfulLogin', () => {
    const mockForm = new FormGroup({
      teamName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    });
    formValidationServiceSpy.checkIsFormValid.and.returnValue(true);
    authServiceSpy.loginOrSignUp.and.returnValue(of(mockTokens));
    component.handleSubmit(mockForm as any);
    expect(formValidationServiceSpy.checkIsFormValid).toHaveBeenCalledWith(mockForm);
    expect(authServiceSpy.loginOrSignUp).toHaveBeenCalledWith(
      component.formType,
      mockForm.getRawValue()
    );
    expect(authServiceSpy.handleSuccessfulLogin).toHaveBeenCalledWith(mockTokens);
  });

  it('onUseADemoTeam should call authService.loginWithDemoTeam and authService.handleSuccessfulLogin', () => {
    authServiceSpy.loginWithDemoTeam.and.returnValue(of(mockTokens));
    component.onUseADemoTeam();
    expect(authServiceSpy.loginWithDemoTeam).toHaveBeenCalled();
    expect(authServiceSpy.handleSuccessfulLogin).toHaveBeenCalledWith(mockTokens);
  });
});
