import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/http-exception';
import { TokenData } from '../types';

export const verifyAccessToken = (
  req: Request,
  res: Response<any, TokenData>,
  next: NextFunction
): void | never => {
  const authHeader = req.get('Authorisation');

  if (authHeader) {
    const accessToken = authHeader.split(' ')[1];

    verify(accessToken, process.env.JWT_ACCESS_SECRET as string, (err, decoded) => {
      if (!err && decoded) {
        const { iat, exp, ...tokenData } = decoded as JwtPayload;
        res.locals = tokenData as TokenData;

        next();
      } else {
        throw new HttpException(401, 'Access token expired or invalid');
      }
    });
  } else {
    throw new HttpException(401, 'No access token provided');
  }
};
