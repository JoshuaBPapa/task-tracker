import { Request, Response } from 'express';
import { CreateTaskReqBody, TokenData } from '../types';
import { deleteTaskById, insertTask, updateTasksById } from '../services';
import { handleEmptyQueryResults } from '../helpers';

export const postTask = async (
  req: Request<any, any, CreateTaskReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { teamId, userId } = res.locals;
  const newTask = await insertTask({ ...req.body, teamId, createdUserId: userId });

  res.status(201).send({ id: newTask[0].insertId });
};

export const putTask = async (
  req: Request<{ id: string }, any, CreateTaskReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { teamId, userId } = res.locals;
  const id = parseInt(req.params.id);
  const updated = await updateTasksById({ ...req.body, teamId, id, createdUserId: userId });
  handleEmptyQueryResults(updated[0]);

  res.status(200).send({ id });
};

export const deleteTask = async (
  req: Request<{ id: string }, any, {}>,
  res: Response<never, TokenData>
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;
  const deleted = await deleteTaskById(id, teamId);
  handleEmptyQueryResults(deleted[0]);

  res.status(204).send();
};
