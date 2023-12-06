import { NextFunction, Response, Request } from 'express';
import { TokenData } from '../../types';
import { HttpException } from '../../exceptions/http-exception';

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';
type BaseRoute = 'projects' | 'tasks' | 'users' | 'comments' | 'teams';
type RequiredAuthLevels = Record<Method, number>;
type AuthLevelMap = Record<BaseRoute, RequiredAuthLevels>;

/*
Base Authorisation level rules
All users - all GET endpoints
level 1 - Base User - Can only edit taks assigned to them and post comments
level 2 - Project Manager - Can edit/create all tasks and projects
level 3 - Admin - Can edit/create everything except for anything relating to the Master Admin
level 4 - Master Admin - Has full access to everything. Only user that can delete the team
*/
const authLevelMap: AuthLevelMap = {
  projects: { GET: 1, DELETE: 2, POST: 2, PUT: 2 },
  tasks: { GET: 1, DELETE: 2, POST: 2, PUT: 1 },
  users: { GET: 1, DELETE: 3, POST: 3, PUT: 3 },
  comments: { GET: 1, DELETE: 0, POST: 1, PUT: 0 },
  teams: { GET: 0, DELETE: 4, POST: 0, PUT: 0 },
};

export const checkAuthLevel = (
  req: Request,
  res: Response<never, TokenData>,
  next: NextFunction
): void | never => {
  const { authLevel } = res.locals;
  const { method, path } = req;
  const baseUrl = path.replace('/', '').split('/')[0];
  const requiredAuthLevel = authLevelMap[baseUrl as BaseRoute][method as Method];

  if (requiredAuthLevel > authLevel) {
    throw new HttpException(403, "User's authorisation level is too low");
  }

  next();
};
