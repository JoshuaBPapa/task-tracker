import { ValidationChain, body } from 'express-validator';
import { maxLengthMsg, requiredMsg } from '../error-messages';

export const checkProjectName = (): ValidationChain => {
  return body('name')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 200 })
    .withMessage(maxLengthMsg(200));
};
