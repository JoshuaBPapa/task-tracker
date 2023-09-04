import { Router } from 'express';
import { catchAsyncError } from '../middleware';
import {
  deleteUser,
  getUserById,
  getUsersPaginated,
  postUser,
  putPassword,
  putUser,
} from '../controllers';
import {
  createUserValidator,
  updatePasswordValidator,
  updateUserValidator,
} from '../middleware/validation/validators';

export const usersRouter = Router();

usersRouter.post('/', catchAsyncError(createUserValidator), catchAsyncError(postUser));
usersRouter.put(
  '/password',
  catchAsyncError(updatePasswordValidator),
  catchAsyncError(putPassword)
);
usersRouter.put('/:id', catchAsyncError(updateUserValidator), catchAsyncError(putUser));
usersRouter.delete('/:id', catchAsyncError(deleteUser));
usersRouter.get('', catchAsyncError(getUsersPaginated));
usersRouter.get('/:id', catchAsyncError(getUserById));
