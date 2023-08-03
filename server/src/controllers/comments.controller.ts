import { Request, Response } from 'express';
import { Comments, CreateCommentReqBody, GetCommentsReqParams, TokenData } from '../types';
import { countTotalComments, insertComment, selectCommentsPaginated } from '../services';
import { Pagination } from '../classes';

export const postComment = async (
  req: Request<any, any, CreateCommentReqBody>,
  res: Response<any, TokenData>
): Promise<void> => {
  const { teamId, userId } = res.locals;
  await insertComment({ ...req.body, teamId, userId });

  res.status(201).send();
};

export const getCommentsPaginated = async (
  req: Request<{ taskId: string }, Pagination<Comments>, any, GetCommentsReqParams>,
  res: Response<Pagination<Comments>, TokenData>
): Promise<void> => {
  const taskId = parseInt(req.params.taskId);
  const { page } = req.query;
  const { teamId } = res.locals;

  const results = await selectCommentsPaginated(teamId, taskId, page);
  const count = await countTotalComments(teamId, taskId);
  const resBody = new Pagination<Comments>(results[0], count[0][0].total, req.query.page);

  res.status(200).send(resBody);
};
