import { ResultSetHeader, FieldPacket, RowDataPacket } from 'mysql2';
import db from '../db/database';
import { CreateUserReqBody, UpdateUserReqBody } from '../types';

interface InsertUserValues extends Omit<CreateUserReqBody, 'confirmPassword'> {
  teamId: number;
  pictureColour: string;
}

interface UpdateUserValues extends UpdateUserReqBody {
  id: number;
  teamId: number;
}

interface User extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  teamId: number;
  authLevel: number;
  jobTitle: string;
  password: string;
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

export const updateUserById = (
  userData: UpdateUserValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    `UPDATE 
      users 
    SET 
      firstName = "${userData.firstName}", lastName = "${userData.lastName}", authLevel = ${userData.authLevel}, jobTitle = "${userData.jobTitle}"  
    WHERE 
      id = ${userData.id} AND teamId = ${userData.teamId}`
  );
};

export const updateUserPasswordById = (
  newPassword: string,
  userId: number,
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    `UPDATE 
      users 
    SET 
      password = "${newPassword}"  
    WHERE 
      id = ${userId} AND teamId = ${teamId}`
  );
};

export const deleteUserById = (
  userId: number,
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(`DELETE FROM users WHERE id = ${userId} AND teamId = ${teamId}`);
};

export const selectUserByUsername = (
  username: string,
  teamId: number
): Promise<[User[], FieldPacket[]]> => {
  return db.execute<User[]>(
    `SELECT * FROM users WHERE username = "${username}" AND teamId = ${teamId}`
  );
};
