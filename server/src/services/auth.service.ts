import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import db from '../db/database';

interface TokenData {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  jobTitle: string;
  teamId: number;
  authLevel: number;
  pictureColour: string;
}

export const hashPw = async (plaintext: string): Promise<string> => {
  const salt = await genSalt(12);

  return await hash(plaintext, salt);
};

export const createAccessToken = (userData: TokenData): string => {
  return sign(userData, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '60m',
  });
};

const insertRefreshToken = async (token: string): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute('INSERT INTO refresh_tokens (token) VALUES (?)', [token]);
};

export const createRefreshToken = async (userData: TokenData): Promise<string> => {
  const refreshToken = sign(userData, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });
  await insertRefreshToken(refreshToken);

  return refreshToken;
};

export const createTokenPair = async (
  userData: TokenData
): Promise<{ accessToken: string; refreshToken: string }> => {
  return {
    accessToken: createAccessToken(userData),
    refreshToken: await createRefreshToken(userData),
  };
};

export const deleteRefreshToken = async (
  token: string
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(`DELETE FROM refresh_tokens WHERE token = "${token}"`);
};
