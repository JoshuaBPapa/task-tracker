import { Request, Response } from 'express';
import {
  CreateUserReqBody,
  UpdateUserReqBody,
  TokenData,
  UpdateUserPassword,
  GetUsersReqParams,
} from '../types';
import {
  updateUserPasswordById,
  deleteUserById,
  getProfilePictureColour,
  hashPw,
  insertUser,
  updateUserById,
  selectUsersPaginated,
  countTotalUsers,
} from '../services';
import { handleEmptyQueryResults } from '../helpers';
import { Pagination } from '../classes';
import { Users } from '../types/response-body/users';

export const postUser = async (
  req: Request<any, any, CreateUserReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { teamId } = res.locals;
  const { confirmPassword, password, ...userData } = req.body;
  const hashedPw = await hashPw(password);
  const pictureColour = getProfilePictureColour();
  const newUser = await insertUser({ ...userData, teamId, password: hashedPw, pictureColour });

  res.status(201).send({ id: newUser[0].insertId });
};

export const putUser = async (
  req: Request<{ id: string }, any, UpdateUserReqBody>,
  res: Response<{ id: number }, TokenData>
): Promise<void> => {
  const { teamId } = res.locals;
  const id = parseInt(req.params.id);
  const updated = await updateUserById({ ...req.body, teamId, id });
  handleEmptyQueryResults(updated[0]);

  res.status(200).send({ id });
};

export const putPassword = async (
  req: Request<any, any, UpdateUserPassword>,
  res: Response<never, TokenData>
): Promise<void> => {
  const { teamId } = res.locals;
  const { password, id } = req.body;
  const hashedPw = await hashPw(password);
  const updated = await updateUserPasswordById(hashedPw, id, teamId);
  handleEmptyQueryResults(updated[0]);

  res.status(204).send();
};

export const deleteUser = async (
  req: Request<{ id: string }, any, {}>,
  res: Response<never, TokenData>
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { teamId } = res.locals;
  const deleted = await deleteUserById(id, teamId);
  handleEmptyQueryResults(deleted[0]);

  res.status(204).send();
};

export const getUsersPaginated = async (
  req: Request<any, Pagination<Users>, any, GetUsersReqParams>,
  res: Response<Pagination<Users>, TokenData>
): Promise<void> => {
  const { teamId } = res.locals;

  const results = await selectUsersPaginated(teamId, req.query);
  const count = await countTotalUsers(teamId, req.query);
  const resBody = new Pagination<Users>(results[0], count[0][0].total, req.query.page);

  res.status(200).send(resBody);
};
