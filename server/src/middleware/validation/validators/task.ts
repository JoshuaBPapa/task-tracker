import { NextFunction, Request, Response } from 'express';
import { runValidationChecks } from '../run-validation-chains';
import {
  checkAssignedUserId,
  checkDescription,
  checkPriority,
  checkProjectId,
  checkStatus,
  checkTaskTitle,
} from '../chains';
import { ValidationChain } from 'express-validator';

export const taskValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  const validationChecks: ValidationChain[] = [
    checkTaskTitle(),
    checkDescription(),
    checkStatus(),
    checkPriority(),
    checkAssignedUserId(),
    checkProjectId(),
  ];

  await runValidationChecks(req, validationChecks, true);

  next();
};
