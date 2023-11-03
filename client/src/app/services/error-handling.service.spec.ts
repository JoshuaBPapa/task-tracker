import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from './form-validation.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  const messageServiceSpy = jasmine.createSpyObj('MessageService', ['clear', 'add']);
  const formValidationServiceSpy = jasmine.createSpyObj('FormValidationService', [
    'handleServerValidationErrors',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: FormValidationService, useValue: formValidationServiceSpy },
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

  it('showErrorMessage should call messageService.add with the correct arguments', () => {
    const mockMessageConfig = {
      severity: 'error',
      summary: `Error: 404`,
      detail: 'Not Found',
      key: 'error',
    };
    service.showErrorMessage(404, 'Not Found');
    expect(messageServiceSpy.add).toHaveBeenCalledWith(mockMessageConfig);
  });
});
