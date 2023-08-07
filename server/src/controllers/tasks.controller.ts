import { Request, Response } from 'express';
import {
  CreateTaskReqBody,
  GetTasksReqParams,
  SingleTask,
  Statistics,
  Tasks,
  TokenData,
} from '../types';
import {
  selectStatisticCounts,
  selectTopTenTasks,
  countTotalTasks,
  deleteTaskById,
  insertTask,
  selectTaskById,
  selectTasksPaginated,
  updateTasksById,
} from '../services';
import { handleEmptyQueryResults } from '../helpers';
import { Pagination } from '../classes';

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

export const getTasksPaginated = async (
  req: Request<
    { tableScope: string | undefined; foreignKeyId: string | undefined },
    Pagination<Tasks>,
    any,
    GetTasksReqParams
  >,
  res: Response<Pagination<Tasks>, TokenData>
): Promise<void> => {
  const { tableScope, foreignKeyId } = req.params;
  const { teamId } = res.locals;

  const results = await selectTasksPaginated(teamId, req.query, tableScope, foreignKeyId);
  const count = await countTotalTasks(teamId, req.query, tableScope, foreignKeyId);
  const resBody = new Pagination<Tasks>(results[0], count[0][0].total, req.query.page);

  res.status(200).send(resBody);
};

export const getTaskById = async (
  req: Request<{ id: string }, SingleTask>,
  res: Response<SingleTask, TokenData>
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;

  const result = await selectTaskById(teamId, id);
  handleEmptyQueryResults(result[0]);

  res.status(200).send(result[0][0]);
};

export const getStatistics = async (req: Request, res: Response<Statistics, TokenData>) => {
  const { teamId } = res.locals;

  const statisticCounts = await selectStatisticCounts(teamId);
  const topTenTasksByStatus = await selectTopTenTasks(teamId, 'status');
  const topTenTasksByDateCreated = await selectTopTenTasks(teamId, 'dateTimeCreated');

  const {
    severeTasksCount,
    tasksAssignedCount,
    totalTasksCount,
    tasksNotStartedCount,
    statusCounts,
  } = statisticCounts[0][0];
  const [tenMostSevereTasks] = topTenTasksByStatus;
  const [tenLatestTasks] = topTenTasksByDateCreated;

  const resBody = {
    severeTasksCount,
    tasksAssignedCount,
    totalTasksCount,
    tasksNotStartedCount,
    statusCounts,
    tenLatestTasks,
    tenMostSevereTasks,
  };

  res.status(200).send(resBody);
};
