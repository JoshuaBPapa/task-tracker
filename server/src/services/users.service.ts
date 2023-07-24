import { ResultSetHeader, FieldPacket } from 'mysql2';
import db from '../db/database';
import { User } from '../types/user';

interface InsertUserValues {
  firstName: string;
  lastName: string;
  username: string;
  jobTitle: string;
  password: string;
  teamId: number;
  authLevel: number;
  pictureColour: string;
}

export const getProfilePictureColour = (): string => {
  const colours = ['#50CD89', '#F1416C', '#7239EA', '#BD00FF', '#009EF7'];
  const randomIndex = Math.floor(Math.random() * (colours.length - 0) + 0);

  return colours[randomIndex];
};

export const insertUser = (
  userData: InsertUserValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    'INSERT INTO users (firstName, lastName, username, teamId, authLevel, jobTitle, password, pictureColour) VALUES (?,?,?,?,?,?,?,?)',
    [
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.teamId,
      userData.authLevel,
      userData.jobTitle,
      userData.password,
      userData.pictureColour,
    ]
  );
};

export const selectUserByUsername = (
  username: string,
  teamId: number
): Promise<[User[], FieldPacket[]]> => {
  return db.execute<User[]>(
    `SELECT * FROM users WHERE username = "${username}" AND teamId = ${teamId}`
  );
};
