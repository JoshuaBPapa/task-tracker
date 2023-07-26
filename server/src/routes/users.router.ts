import { Router } from 'express';
import { catchAsyncError } from '../middleware';
import { deleteUser, postUser, putPassword, putUser } from '../controllers';
import { createUserValidator, updatePasswordValidator } from '../middleware/validation/validators';
import { updateUserValidator } from '../middleware/validation/validators/update-user';

export const usersRouter = Router();

usersRouter.post('/', catchAsyncError(createUserValidator), catchAsyncError(postUser));
usersRouter.put(
  '/password',
  catchAsyncError(updatePasswordValidator),
  catchAsyncError(putPassword)
);
usersRouter.put('/:id', catchAsyncError(updateUserValidator), catchAsyncError(putUser));
usersRouter.delete('/:id', catchAsyncError(deleteUser));
