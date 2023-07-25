import { ValidationChain, body } from 'express-validator';
import { LoginReqBody, TokenData } from '../../../types';
import { Response } from 'express';
import { selectUserByUsername } from '../../../services';
import { compare } from 'bcryptjs';
import { requiredMsg } from '../error-messages';

export const checkDbForUsernamePassword = (res: Response<any, TokenData>): ValidationChain => {
  const errorMessage = 'Username or password incorrect';

  return body('username').custom(async (value: string, meta) => {
    const body: LoginReqBody = meta.req.body;

    const findUser = await selectUserByUsername(value, res.locals.teamId);
    if (!findUser[0].length) return Promise.reject(errorMessage);
    if (!(await compare(body.password, findUser[0][0].password))) {
      return Promise.reject(errorMessage);
    }

    // save user to locals for creation of JWTs - prevents repeating the same db queries in the auth login controller
    const { id, password, ...user } = findUser[0][0];
    res.locals = { ...res.locals, ...user, userId: id };
  });
};

export const checkRefreshToken = (): ValidationChain => {
  return body('refreshToken').notEmpty().withMessage(requiredMsg());
};
