import { Request, Response, NextFunction } from 'express';
import { CreateUserReqBody, TokenData } from '../../../types';
import {
  checkAuthLevel,
  checkFirstNameOrLastName,
  checkJobTitle,
  checkPassword,
  checkUsername,
  checkUsernameIsTaken,
} from '../chains';
import { ValidationChain } from 'express-validator';
import { runValidationChecks } from '../run-validation-chains';

export const createUserValidator = async (
  req: Request<any, any, CreateUserReqBody>,
  res: Response<any, TokenData>,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [
    checkUsername(),
    checkPassword(true),
    checkFirstNameOrLastName('firstName'),
    checkFirstNameOrLastName('lastName'),
    checkJobTitle(),
    checkAuthLevel(),
  ];
  const dbValidationChecks: ValidationChain[] = [checkUsernameIsTaken(res)];

  await runValidationChecks(req, validationChecks, true);
  await runValidationChecks(req, dbValidationChecks, false);

  next();
};
