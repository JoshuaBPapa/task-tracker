import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator';
import { checkRefreshToken } from '../chains';
import { runValidationChecks } from '../run-validation-chains';

export const logutValidator = async (
  req: Request<any, any, { refreshToken: string }>,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [checkRefreshToken()];

  await runValidationChecks(req, validationChecks, true);

  next();
};
