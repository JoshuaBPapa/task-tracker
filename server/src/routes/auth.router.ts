import { Router } from 'express';
import { postLogin, postLogout, postNewAccessToken, postSignUp } from '../controllers';
import {
  loginValidator,
  logutOrTokenValidator,
  signUpValidator,
} from '../middleware/validation/validators';
import { catchAsyncError } from '../middleware';

export const authRouter = Router();

authRouter.post('/sign-up', catchAsyncError(signUpValidator), catchAsyncError(postSignUp));
authRouter.post('/login', catchAsyncError(loginValidator), catchAsyncError(postLogin));
authRouter.post('/logout', catchAsyncError(logutOrTokenValidator), catchAsyncError(postLogout));
authRouter.post(
  '/token',
  catchAsyncError(logutOrTokenValidator),
  catchAsyncError(postNewAccessToken)
);
