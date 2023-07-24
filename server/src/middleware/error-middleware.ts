import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http-exception';

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'There was an error. Please try again later.';
  const furtherInformation = err.furtherInformation;

  console.log(err);

  res.status(status).send({
    status,
    message,
    furtherInformation,
  });
};
