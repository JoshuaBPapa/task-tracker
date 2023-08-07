import { Router } from 'express';
import {
  deleteTask,
  getTaskById,
  getStatistics,
  getTasksPaginated,
  postTask,
  putTask,
} from '../controllers';
import { catchAsyncError } from '../middleware';
import { taskValidator } from '../middleware/validation/validators';

export const tasksRouter = Router();

tasksRouter.post('', catchAsyncError(taskValidator), catchAsyncError(postTask));
tasksRouter.put('/:id', catchAsyncError(taskValidator), catchAsyncError(putTask));
tasksRouter.delete('/:id', catchAsyncError(deleteTask));
tasksRouter.get('/statistics', catchAsyncError(getStatistics));
tasksRouter.get('/task/:id', catchAsyncError(getTaskById));
// optional tableScope and foreignKeyId params. This is for getting tasks only for a specific project or assigned user.
tasksRouter.get('/:tableScope?/:foreignKeyId?', catchAsyncError(getTasksPaginated));
