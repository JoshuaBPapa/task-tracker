import { NextFunction, Request, Response } from 'express';
import { CreateProjectReqBody, TokenData } from '../../../types';
import { runValidationChecks } from '../run-validation-chains';
import { checkProjectName } from '../chains';

export const projectValidator = async (
  req: Request<any, any, CreateProjectReqBody>,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  await runValidationChecks(req, [checkProjectName()], true);

  next();
};
