import { Router } from 'express';
import { deleteTask, getTasksPaginated, postComment, postTask, putTask } from '../controllers';
import { catchAsyncError } from '../middleware';
import { commentValidator, taskValidator } from '../middleware/validation/validators';

export const tasksRouter = Router();

tasksRouter.post('', catchAsyncError(taskValidator), catchAsyncError(postTask));
tasksRouter.post('/comment', catchAsyncError(commentValidator), catchAsyncError(postComment));
tasksRouter.put('/:id', catchAsyncError(taskValidator), catchAsyncError(putTask));
tasksRouter.delete('/:id', catchAsyncError(deleteTask));
tasksRouter.get('', catchAsyncError(getTasksPaginated));
