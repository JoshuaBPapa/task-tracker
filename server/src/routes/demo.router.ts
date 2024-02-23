import { Router } from 'express';
import { catchAsyncError } from '../middleware';
import { getDemoTeam } from '../controllers';

export const demoRouter = Router();

demoRouter.get('', catchAsyncError(getDemoTeam));
