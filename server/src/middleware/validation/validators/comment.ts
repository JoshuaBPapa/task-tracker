import { Request, Response, NextFunction } from 'express';
import { checkComment, checkTaskBelongsToTeam, checkTaskId } from '../chains';
import { runValidationChecks } from '../run-validation-chains';
import { TokenData } from '../../../types';

export const commentValidator = async (
  req: Request,
  res: Response<any, TokenData>,
  next: NextFunction
): Promise<void | NextFunction> => {
  await runValidationChecks(
    req,
    [checkComment(), checkTaskId(), checkTaskBelongsToTeam(res)],
    false
  );

  next();
};
