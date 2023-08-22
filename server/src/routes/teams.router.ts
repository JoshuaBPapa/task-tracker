import { Router } from 'express';
import { catchAsyncError } from '../middleware';
import { deleteTeam } from '../controllers';

export const teamsRouter = Router();

teamsRouter.delete('', catchAsyncError(deleteTeam));
