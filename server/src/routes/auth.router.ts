import { Router } from 'express';
import { postLogin, postLogout, postSignUp } from '../controllers';
import { loginValidator, signUpValidator } from '../middleware/validation/validators';
import { catchAsyncError } from '../middleware';

export const authRouter = Router();

authRouter.post('/sign-up', catchAsyncError(signUpValidator), catchAsyncError(postSignUp));
authRouter.post('/login', catchAsyncError(loginValidator), catchAsyncError(postLogin));
authRouter.post('/logout', catchAsyncError(postLogout));
