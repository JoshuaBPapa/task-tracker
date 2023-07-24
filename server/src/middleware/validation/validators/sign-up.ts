import { NextFunction, Request, Response } from 'express';
import { ValidationChain } from 'express-validator';
import { SignUpReqBody } from '../../../types';
import {
  checkTeamName,
  checkFirstNameOrLastName,
  checkJobTitle,
  checkPassword,
  checkUsername,
  checkDbIfTeamNameExists,
} from '../chains';
import { runValidationChecks } from '../run-validation-chains';

export const signUpValidator = async (
  req: Request<any, any, SignUpReqBody>,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [
    checkTeamName(),
    checkUsername(),
    checkPassword(true),
    checkFirstNameOrLastName('firstName'),
    checkFirstNameOrLastName('lastName'),
    checkJobTitle(),
  ];
  const dbValidationChecks: ValidationChain[] = [checkDbIfTeamNameExists(true, res)];

  await runValidationChecks(req, validationChecks, true);
  await runValidationChecks(req, dbValidationChecks, false);

  next();
};
