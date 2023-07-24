import { LoginReqBody } from './login-req-body';

export interface SignUpReqBody extends LoginReqBody {
  firstName: string;
  lastName: string;
  jobTitle: string;
  confirmPassword: string;
}
