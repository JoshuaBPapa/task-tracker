import { NextFunction, Request, Response } from 'express';
import { runValidationChecks } from '../run-validation-chains';
import { checkProjectName } from '../chains';

export const projectValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  await runValidationChecks(req, [checkProjectName()], true);

  next();
};
