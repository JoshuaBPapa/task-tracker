import { ValidationChain, body } from 'express-validator';
import { betweenIntsMsg, intOnlyMsg, maxLengthMsg, requiredMsg } from '../error-messages';

export const checkTaskTitle = (): ValidationChain => {
  return body('title')
    .trim()
    .notEmpty()
    .withMessage(requiredMsg())
    .isLength({ max: 300 })
    .withMessage(maxLengthMsg(300));
};

export const checkDescription = (): ValidationChain => {
  return body('description').trim().isLength({ max: 2000 }).withMessage(maxLengthMsg(2000));
};

export const checkStatus = (): ValidationChain => {
  return body('status')
    .notEmpty()
    .withMessage(requiredMsg())
    .isInt({ min: 1, max: 4 })
    .withMessage(betweenIntsMsg(1, 4));
};

export const checkPriority = (): ValidationChain => {
  return body('priority')
    .notEmpty()
    .withMessage(requiredMsg())
    .isInt({ min: 1, max: 4 })
    .withMessage(betweenIntsMsg(1, 4));
};

export const checkAssignedUserId = (): ValidationChain => {
  return body('assignedUserId')
    .isInt()
    .withMessage(intOnlyMsg())
    .optional({ values: 'null' })
    .default(null);
};

export const checkProjectId = (): ValidationChain => {
  return body('projectId').isInt().withMessage(intOnlyMsg());
};
