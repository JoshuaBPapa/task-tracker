import { Request, Response, NextFunction } from 'express';
import { UpdateUserReqBody, TokenData } from '../../../types';
import { checkAuthLevel, checkFirstNameOrLastName, checkJobTitle } from '../chains';
import { ValidationChain } from 'express-validator';
import { runValidationChecks } from '../run-validation-chains';

export const updateUserValidator = async (
  req: Request<any, any, UpdateUserReqBody>,
  res: Response<any, TokenData>,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [
    checkFirstNameOrLastName('firstName'),
    checkFirstNameOrLastName('lastName'),
    checkJobTitle(),
    checkAuthLevel(false),
  ];

  await runValidationChecks(req, validationChecks, true);

  next();
};
