import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from './form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['clear', 'add']);
  const formValidationServiceSpy = jasmine.createSpyObj('FormValidationService', [
    'handleServerValidationErrors',
  ]);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: FormValidationService, useValue: formValidationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('handleError should set isLoading to false, call messageService.clear, and call showErrorMessage with the correct arguments', () => {
    spyOn(service, 'showErrorMessage');
    const mockLoading = new BehaviorSubject(true);
    const mockErrorResponse: any = {
      error: {
        furtherInformation: {},
        message: 'Mock Error',
        status: 400,
      },
    };
    service.handleError(mockErrorResponse, mockLoading);
    expect(mockLoading.value).toBeFalse();
    expect(messageServiceSpy.clear).toHaveBeenCalled();
    expect(service.showErrorMessage).toHaveBeenCalledWith(400, 'Mock Error');
  });

  it('handleError should call formValidationService.handleServerValidationErrors with the correct arguments if a form is present and the error message is "Validation failed"', () => {
    const mockForm = new FormGroup({ teamName: new FormControl('') });
    const mockLoading = new BehaviorSubject(true);
    const mockErrorResponse: any = {
      error: {
        furtherInformation: {
          validationErrors: [
            {
              type: 'field',
              value: 'MockTeamName',
              msg: 'Team name not found',
              path: 'teamName',
              location: 'body',
            },
          ],
        },
        message: 'Validation failed',
        status: 400,
      },
    };
    const { validationErrors } = mockErrorResponse.error.furtherInformation;
    service.handleError(mockErrorResponse, mockLoading, mockForm);
    expect(formValidationServiceSpy.handleServerValidationErrors).toHaveBeenCalledWith(
      validationErrors,
      mockForm
    );
  });

  it('handleResolverError should call router.navigateByUrl with the correct arguments', () => {
    service.handleResolverError(
      new HttpErrorResponse({ error: { status: 400, message: 'Mock Error' } })
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/error', {
      state: { message: 'Error: 400 - Mock Error' },
      skipLocationChange: true,
    });
  });
});
