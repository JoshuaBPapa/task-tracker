import { NextFunction, Request, Response } from 'express';

type Middleware = (
  req: Request<any, any, any, any>,
  res: Response<any, any>,
  next: NextFunction
) => Promise<void | NextFunction>;

export const catchAsyncError = (middleware: Middleware): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
