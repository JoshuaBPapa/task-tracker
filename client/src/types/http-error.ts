import { HttpErrorResponse } from '@angular/common/http';
import { ServerValidationError } from './server-validation-error';

interface FurtherInformation {
  [key: string]: any;
  validationErrors?: ServerValidationError[];
}

export interface HttpError extends HttpErrorResponse {
  error: {
    furtherInformation: FurtherInformation;
    message: string;
    status: number;
  };
}
