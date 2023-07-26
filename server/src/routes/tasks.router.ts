import { Router } from 'express';
import { deleteTask, postTask, putTask } from '../controllers';
import { catchAsyncError } from '../middleware';
import { taskValidator } from '../middleware/validation/validators';

export const tasksRouter = Router();

tasksRouter.post('', catchAsyncError(taskValidator), catchAsyncError(postTask));
tasksRouter.put('/:id', catchAsyncError(taskValidator), catchAsyncError(putTask));
tasksRouter.delete('/:id', catchAsyncError(deleteTask));
