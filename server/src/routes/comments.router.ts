import { Router } from 'express';
import { postComment } from '../controllers';
import { catchAsyncError } from '../middleware';
import { commentValidator } from '../middleware/validation/validators';

export const commentsRouter = Router();

commentsRouter.post('', catchAsyncError(commentValidator), catchAsyncError(postComment));
