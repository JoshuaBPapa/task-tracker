import { ValidationChain, body } from 'express-validator';
import { intOnlyMsg, maxLengthMsg, requiredMsg } from '../error-messages';

export const checkComment = (): ValidationChain => {
  return body('comment')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 2000 })
    .withMessage(maxLengthMsg(2000));
};

export const checkTaskId = (): ValidationChain => {
  return body('taskId').isInt().withMessage(intOnlyMsg());
};
