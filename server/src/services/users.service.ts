import { ResultSetHeader, FieldPacket, RowDataPacket } from 'mysql2';
import db from '../db/database';
import {
  CreateUserReqBody,
  GetUsersReqParams,
  SelectCountResults,
  SingleUser,
  UpdateUserReqBody,
  Users,
} from '../types';
import { Pagination } from '../classes';
import {
  buildFilterQueryString,
  buildOrderByQueryString,
  buildSearchQueryString,
} from '../helpers';

interface InsertUserValues extends Omit<CreateUserReqBody, 'confirmPassword'> {
  teamId: number;
  pictureColour: string;
}

interface UpdateUserValues extends UpdateUserReqBody {
  id: number;
  teamId: number;
}

interface UserWithPw extends RowDataPacket {
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

type SelectUsersResults = RowDataPacket & Users;

type SelectSingleUserResult = RowDataPacket & SingleUser;

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
): Promise<[UserWithPw[], FieldPacket[]]> => {
  return db.execute<UserWithPw[]>(
    `SELECT * FROM users WHERE username = "${username}" AND teamId = ${teamId}`
  );
};

export const selectUsersPaginated = (
  teamId: number,
  params: GetUsersReqParams
): Promise<[SelectUsersResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(params.page);
  const orderByQueryString = buildOrderByQueryString(params.orderBy);
  const searchQueryString = buildSearchQueryString(params.search, 'firstName');
  const authLevelFilterQueryString = buildFilterQueryString(params.authLevel, 'authLevel');

  return db.execute(`
    SELECT 
      u.id, u.firstName, u.lastName, u.username, u.authLevel, u.jobTitle, u.pictureColour,
      COUNT(t.assignedUserId) as 'assignedTasks' 
    FROM 
      users AS u
    LEFT JOIN
      tasks AS t
    ON
      u.id = t.assignedUserId
    WHERE
      u.teamId = ${teamId} ${searchQueryString} ${authLevelFilterQueryString}
    GROUP BY
      u.id
    ${orderByQueryString}
    ${paginationQueryString}`);
};

export const countTotalUsers = (
  teamId: number,
  params: GetUsersReqParams
): Promise<[SelectCountResults[], FieldPacket[]]> => {
  const authLevelFilterQueryString = buildFilterQueryString(params.authLevel, 'authLevel');
  const searchQueryString = buildSearchQueryString(params.search, 'firstName');

  return db.execute(`    
    SELECT 
      COUNT(*) AS total 
    FROM 
      users 
    WHERE 
      teamId = ${teamId} ${searchQueryString} ${authLevelFilterQueryString}`);
};

export const selectUserById = (
  teamId: number,
  userId: number
): Promise<[SelectSingleUserResult[], FieldPacket[]]> => {
  return db.execute(`
    SELECT 
      u.id, u.firstName, u.lastName, u.username, u.authLevel, u.jobTitle, u.pictureColour,
      COUNT(t.assignedUserId) as 'assignedTasks' 
    FROM 
      users AS u
    LEFT JOIN
      tasks AS t
    ON
      u.id = t.assignedUserId
    WHERE
      u.teamId = ${teamId} AND u.id = ${userId}
    GROUP BY
      u.id`);
};
