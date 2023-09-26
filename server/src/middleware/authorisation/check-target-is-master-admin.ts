import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../exceptions/http-exception';
import { handleEmptyQueryResults } from '../../helpers';
import { selectUserById } from '../../services';
import { TokenData } from '../../types';

export const checkTargetIsMasterAdmin = async (
  req: Request<{ id: string }>,
  res: Response<unknown, TokenData>,
  next: NextFunction
): Promise<void | never> => {
  const targetUserId = parseInt(req.params.id);
  const { method } = req;
  const { teamId, authLevel } = res.locals;

  const findUser = await selectUserById(teamId, targetUserId);
  handleEmptyQueryResults(findUser[0]);
  const targetUser = findUser[0][0];

  if (targetUser.authLevel === 4 && authLevel < 4) {
    throw new HttpException(403, 'Only the Master Admin can edit the Master Admin');
  }

  switch (method) {
    case 'PUT':
      checkMasterAdminUpdate(targetUser.authLevel, req.body.authLevel);
      break;
    case 'DELETE':
      checkMasterAdminDelete(targetUser.authLevel);
      break;
    default:
      break;
  }

  next();
};

const checkMasterAdminUpdate = (currentAuthLevel: number, newAuthLevel: number): void | never => {
  if (currentAuthLevel < 4 && newAuthLevel === 4) {
    throw new HttpException(403, 'There can only be one Master Admin');
  }
  if (currentAuthLevel === 4 && newAuthLevel < 4) {
    throw new HttpException(403, 'The authorisation level of the Master Admin can not be changed');
  }
};

const checkMasterAdminDelete = (targetAuthLevel: number) => {
  if (targetAuthLevel === 4) {
    throw new HttpException(403, 'The Master Admin can not be deleted');
  }
};
