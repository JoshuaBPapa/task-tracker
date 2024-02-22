import { Request, Response } from 'express';
import {
  createAccessToken,
  createTokenPair,
  decodeToken,
  deleteRefreshToken,
  getProfilePictureColour,
  hashPw,
  insertTeam,
  insertUser,
} from '../services';
import { SignUpReqBody, TokenData } from '../types';
import { HttpException } from '../exceptions/http-exception';

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
  const { firstName, lastName, jobTitle, username, teamName } = body;
  const tokenPair = await createTokenPair({
    firstName,
    lastName,
    username,
    jobTitle,
    teamId,
    teamName,
    authLevel: 4,
    pictureColour,
    userId,
  });

  res.status(201).send(tokenPair);
};

export const postLogin = async (
  req: Request,
  res: Response<{ accessToken: string; refreshToken: string }, TokenData>
): Promise<void> => {
  // db already queried for teamId and user data during auth login validation middleware
  // values saved in res.locals to prevent repetitive db queries
  const tokenPair = await createTokenPair(res.locals);

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

export const postNewAccessToken = async (
  req: Request<any, any, { refreshToken: string }>,
  res: Response<{ accessToken: string }>
): Promise<void> => {
  const { refreshToken } = req.body;
  const tokenData = await decodeToken(refreshToken);

  if (!tokenData) {
    // delete any expired refresh tokens
    await deleteRefreshToken(refreshToken);
    throw new HttpException(401, 'Refresh token invalid');
  }

  const accessToken = createAccessToken(tokenData);
  res.status(200).send({ accessToken });
};
