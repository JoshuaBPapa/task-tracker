import { ValidationChain, body } from 'express-validator';
import { intOnlyMsg, maxLengthMsg, requiredMsg } from '../error-messages';
import { Response } from 'express';
import { TokenData } from '../../../types';
import { selectTaskById } from '../../../services';

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

export const checkTaskBelongsToTeam = (res: Response<any, TokenData>): ValidationChain => {
  return body('taskId').custom(async (taskId: number) => {
    const findTask = await selectTaskById(res.locals.teamId, taskId);
    if (!findTask[0].length) return Promise.reject('This task does not belong to this team');
  });
};
