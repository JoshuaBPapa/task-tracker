import { Request, Response, NextFunction } from 'express';
import { TokenData, UpdateUserPassword } from '../../../types';
import { checkPassword } from '../chains';
import { runValidationChecks } from '../run-validation-chains';

export const updatePasswordValidator = async (
  req: Request<any, any, UpdateUserPassword>,
  res: Response<any, TokenData>,
  next: NextFunction
): Promise<void | NextFunction> => {
  await runValidationChecks(req, [checkPassword(true)], true);

  next();
};
