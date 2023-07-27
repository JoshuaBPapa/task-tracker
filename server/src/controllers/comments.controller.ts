import { Request, Response } from 'express';
import { CreateCommentReqBody, TokenData } from '../types';
import { insertComment } from '../services';

export const postComment = async (
  req: Request<any, any, CreateCommentReqBody>,
  res: Response<any, TokenData>
): Promise<void> => {
  const { teamId, userId } = res.locals;
  await insertComment({ ...req.body, teamId, userId });

  res.status(201).send();
};
