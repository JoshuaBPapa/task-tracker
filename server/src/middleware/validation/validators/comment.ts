import { Request, Response, NextFunction } from 'express';
import { checkComment, checkTaskId } from '../chains';
import { runValidationChecks } from '../run-validation-chains';

export const commentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  await runValidationChecks(req, [checkComment(), checkTaskId()], true);

  next();
};
