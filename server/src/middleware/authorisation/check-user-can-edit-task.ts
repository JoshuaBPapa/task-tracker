import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../exceptions/http-exception';
import { handleEmptyQueryResults } from '../../helpers';
import { selectTaskById } from '../../services';
import { CreateTaskReqBody, TokenData } from '../../types';

export const checkUserCanEditTask = async (
  req: Request<{ id: string }, any, CreateTaskReqBody>,
  res: Response<unknown, TokenData>,
  next: NextFunction
): Promise<void | never | NextFunction> => {
  const targetTaskId = parseInt(req.params.id);
  const { teamId, authLevel, userId } = res.locals;
  const newAssignedUserId = req.body.assignedUserId;

  const response = await selectTaskById(teamId, targetTaskId);
  handleEmptyQueryResults(response[0]);

  const targetTask = response[0][0];
  // return from this check if the user is not a base level user
  if (authLevel > 1) return next();
  // only allow base level users edit tasks they are assigned to
  if (!targetTask.assignedUser || targetTask.assignedUser.id !== userId) {
    throw new HttpException(403, 'You can only edit tasks you are assigned to');
  }
  // restrict base level users from reassigning a task to another user
  if (newAssignedUserId !== userId) {
    throw new HttpException(403, 'You do not have the authorisation to reassign tasks');
  }

  next();
};
