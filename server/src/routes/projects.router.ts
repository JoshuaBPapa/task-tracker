import { Router } from 'express';
import { selectProjects } from '../controllers';

export const projectsRouter = Router();

projectsRouter.get('', selectProjects);
