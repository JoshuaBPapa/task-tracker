import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator';
import { LoginReqBody, TokenData } from '../../../types';
import {
  checkTeamName,
  checkPassword,
  checkUsername,
  checkDbIfTeamNameExists,
  checkDbForUsernamePassword,
} from '../chains';
import { runValidationChecks } from '../run-validation-chains';

export const loginValidator = async (
  req: Request<any, any, LoginReqBody>,
  res: Response<any, TokenData>,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [
    checkTeamName(),
    checkUsername(),
    checkPassword(false),
  ];
  const dbValidationChecks: ValidationChain[] = [
    checkDbIfTeamNameExists(false, res),
    checkDbForUsernamePassword(res),
  ];

  await runValidationChecks(req, validationChecks, true);
  await runValidationChecks(req, dbValidationChecks, false);

  next();
};
