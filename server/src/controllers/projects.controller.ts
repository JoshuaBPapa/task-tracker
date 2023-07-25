import { Request, Response } from 'express';

export const selectProjects = async (req: Request, res: Response) => {
  res.status(200).send('/projects endpoint reached');
};
