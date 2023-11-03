import { TestBed } from '@angular/core/testing';

import { FormValidationService } from './form-validation.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerValidationError } from 'src/types/server-validation-error';

describe('FormValidationService', () => {
  let service: FormValidationService;
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['clear', 'add']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: messageServiceSpy }],
    });
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkForm should mark all controls as touched and return false if form is invalid', () => {
    const mockForm = new FormGroup({ mockInput: new FormControl('', Validators.required) });
    expect(mockForm.touched).toBe(false);
    expect(service.checkIsFormValid(mockForm)).toBe(false);
    expect(mockForm.touched).toBe(true);
  });

  it('checkForm should return true if form is valid', () => {
    const mockForm = new FormGroup({ mockInput: new FormControl('test', Validators.required) });
    expect(service.checkIsFormValid(mockForm)).toBe(true);
  });

  it('handleServerValidationErrors should set errors on the right form controls and call messageService.add with the right arugments', () => {
    const mockValidationErrors: ServerValidationError[] = [
      {
        type: 'field',
        value: '',
        msg: 'Required',
        path: 'mockInput',
        location: 'body',
      },
    ];
    const mockForm = new FormGroup({
      mockInput: new FormControl('', Validators.required),
      mockInputTwo: new FormControl(''),
    });

    expect(mockForm.controls.mockInput.errors).not.toEqual({ serverSideError: 'Required' });
    expect(mockForm.controls.mockInputTwo.errors).toBeNull();

    service.handleServerValidationErrors(mockValidationErrors, mockForm);
    expect(mockForm.controls.mockInput.errors).toEqual({ serverSideError: 'Required' });
    expect(mockForm.controls.mockInputTwo.errors).toBeNull();
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Validation failed. Please check all fields are correct',
      key: 'error',
    });
  });

  it('handleServerValidationErrors should not set an error on the form control if the error message is "Username or password incorrect" and should call messageServiceSpy.add with the right arguements', () => {
    const mockValidationErrors: ServerValidationError[] = [
      {
        type: 'field',
        value: '',
        msg: 'Username or password incorrect',
        path: 'mockInput',
        location: 'body',
      },
    ];
    const mockForm = new FormGroup({
      mockInput: new FormControl(''),
    });

    expect(mockForm.controls.mockInput.errors).toBeNull();

    service.handleServerValidationErrors(mockValidationErrors, mockForm);
    expect(mockForm.controls.mockInput.errors).toBeNull();
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Failed to Login',
      detail: 'Username or password incorrect',
      key: 'error',
    });
  });
});
