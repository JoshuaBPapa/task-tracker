import { Response, Request } from 'express';
import { handleEmptyQueryResults } from '../helpers';
import { deleteTeamById } from '../services';
import { TokenData } from '../types';

export const deleteTeam = async (req: Request, res: Response<never, TokenData>): Promise<void> => {
  const { teamId } = res.locals;
  const deleted = await deleteTeamById(teamId);
  handleEmptyQueryResults(deleted[0]);

  res.status(204).send();
};
