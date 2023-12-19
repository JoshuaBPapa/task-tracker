import { Request, Response } from 'express';
import {
  countTotalProjects,
  deleteProjectById,
  insertProject,
  selectProjectById,
  selectProjectsPaginated,
  updateProjectById,
} from '../services';
import { CreateProjectReqBody, GetProjectsReqParams, Project } from '../types';
import { TokenData } from '../types';
import { handleEmptyQueryResults } from '../helpers';
import { Pagination } from '../classes';

export const postProject = async (
  req: Request<any, any, CreateProjectReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { name } = req.body;
  const { teamId } = res.locals;
  const newProject = await insertProject({ name, teamId });

  res.status(201).send({ id: newProject[0].insertId });
};

export const putProject = async (
  req: Request<{ id: string }, any, CreateProjectReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { name } = req.body;
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;
  const updated = await updateProjectById({ id, name, teamId });
  handleEmptyQueryResults(updated[0]);

  res.status(200).send({ id });
};

export const deleteProject = async (
  req: Request<{ id: string }, any, {}>,
  res: Response<never, TokenData>
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;
  const deleted = await deleteProjectById(id, teamId);
  handleEmptyQueryResults(deleted[0]);

  res.status(204).send();
};

export const getProjectsPaginated = async (
  req: Request<any, Pagination<Project>, any, GetProjectsReqParams>,
  res: Response<Pagination<Project>, TokenData>
): Promise<void> => {
  const { teamId } = res.locals;

  const results = await selectProjectsPaginated(teamId, req.query);
  const count = await countTotalProjects(teamId, req.query);
  const resBody = new Pagination<Project>(results[0], count[0][0].total, req.query.page);

  res.status(200).send(resBody);
};

export const getProjectById = async (
  req: Request<{ id: string }, Project>,
  res: Response<Project, TokenData>
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;

  const result = await selectProjectById(teamId, id);
  handleEmptyQueryResults(result[0]);

  res.status(200).send(result[0][0]);
};
