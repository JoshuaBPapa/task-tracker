import { Request } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { HttpException } from '../../exceptions/http-exception';

export const runValidationChecks = async (
  req: Request,
  validationChecks: ValidationChain[],
  runParallel: boolean
): Promise<void | never> => {
  // run all checks parallel or sequential processing to break the check loop if a validation fails preventing unnecessary database queries
  if (runParallel) await Promise.all(validationChecks.map((check) => check.run(req)));
  else {
    for (const check of validationChecks) {
      const result = await check.run(req);
      if (!result.isEmpty()) break;
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpException(400, 'Validation failed', { validationErrors: errors.array() });
  }
};
