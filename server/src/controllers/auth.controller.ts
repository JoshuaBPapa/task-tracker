import { Request, Response } from 'express';
import {
  createTokenPair,
  deleteRefreshToken,
  getProfilePictureColour,
  hashPw,
  insertTeam,
  insertUser,
} from '../services';
import { ResponseLocals, SignUpReqBody } from '../types';

export const postSignUp = async (
  req: Request<any, any, SignUpReqBody>,
  res: Response<{ accessToken: string; refreshToken: string }>
): Promise<void> => {
  const { body } = req;

  // create new team
  const newTeam = await insertTeam(body.teamName);
  const teamId = newTeam[0].insertId;

  // create a user using team id and user values
  const hashedPw = await hashPw(body.password);
  const pictureColour = getProfilePictureColour();
  const newUser = await insertUser({
    ...body,
    password: hashedPw,
    teamId,
    authLevel: 4,
    pictureColour,
  });
  const userId = newUser[0].insertId;

  // create token pair using team id and new user
  const { firstName, lastName, jobTitle, username } = body;
  const tokenPair = await createTokenPair({
    firstName,
    lastName,
    username,
    jobTitle,
    teamId,
    authLevel: 4,
    pictureColour,
    userId,
  });

  res.status(201).send(tokenPair);
};

export const postLogin = async (
  req: Request,
  res: Response<{ accessToken: string; refreshToken: string }, ResponseLocals>
): Promise<void> => {
  // db already queried for teamId and user data during auth login validation middleware
  // values saved in res.locals to prevent repetitive db queries
  const { teamId, userLoggedIn } = res.locals;
  const userData = {
    userId: userLoggedIn.userId,
    firstName: userLoggedIn.firstName,
    lastName: userLoggedIn.lastName,
    username: userLoggedIn.username,
    jobTitle: userLoggedIn.jobTitle,
    authLevel: userLoggedIn.authLevel,
    pictureColour: userLoggedIn.pictureColour,
  };
  const tokenPair = await createTokenPair({ ...userData, teamId });

  res.status(200).send(tokenPair);
};

export const postLogout = async (
  req: Request<any, any, { refreshToken: string }>,
  res: Response<string>
): Promise<void> => {
  const { refreshToken } = req.body;
  await deleteRefreshToken(refreshToken);

  res.status(200).send('Successfully logged out.');
};
