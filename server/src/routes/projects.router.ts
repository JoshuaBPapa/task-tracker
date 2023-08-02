import { Router } from 'express';
import { deleteProject, getProjectsPaginated, postProject, putProject } from '../controllers';
import { catchAsyncError } from '../middleware';
import { projectValidator } from '../middleware/validation/validators';

export const projectsRouter = Router();

projectsRouter.post('', catchAsyncError(projectValidator), catchAsyncError(postProject));
projectsRouter.put('/:id', catchAsyncError(projectValidator), catchAsyncError(putProject));
projectsRouter.delete('/:id', catchAsyncError(deleteProject));
projectsRouter.get('', catchAsyncError(getProjectsPaginated));
