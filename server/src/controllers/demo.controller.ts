import { Request, Response } from 'express';
import {
  createTokenPair,
  getProfilePictureColour,
  insertComment,
  insertProject,
  insertTask,
  insertTeam,
  insertUser,
} from '../services';
import { demoComments, demoMasterAdmin, demoProjects, demoTasks, demoUsers } from '../demo';
import { FieldPacket, ResultSetHeader } from 'mysql2';

export const getDemoTeam = async (
  req: Request,
  res: Response<{ accessToken: string; refreshToken: string }>
): Promise<void> => {
  // create a demo team
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  const teamName = `Demo Team ${randomSixDigits}`;
  const demoTeam = await insertTeam(teamName);
  const teamId = demoTeam[0].insertId;

  // create a master admin
  const pictureColour = getProfilePictureColour();
  const masterAdmin = await insertUser({
    teamId,
    pictureColour,
    ...demoMasterAdmin,
  });

  // create projects
  const projects = await Promise.all(demoProjects.map((name) => insertProject({ name, teamId })));

  // create users
  const users = await Promise.all(
    demoUsers.map(
      ({ firstName, lastName, username, authLevel, jobTitle, password, pictureColour }) =>
        insertUser({
          firstName,
          lastName,
          username,
          authLevel,
          jobTitle,
          password,
          pictureColour,
          teamId,
        })
    )
  );

  // create tasks
  const tasks = await Promise.all(createTasks(users, masterAdmin[0].insertId, projects, teamId));

  // create comments
  const comments = await Promise.all(createComments(users, tasks, teamId));

  // create tokens for user to login with
  const tokenPair = await createTokenPair({
    teamId,
    teamName,
    pictureColour,
    ...demoMasterAdmin,
    userId: masterAdmin[0].insertId,
  });

  res.status(201).send(tokenPair);
};

const createTasks = (
  users: [ResultSetHeader, FieldPacket[]][],
  masterAdminId: number,
  projects: [ResultSetHeader, FieldPacket[]][],
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]>[] => {
  const assignedUserOptions = [null, ...users.map((user) => user[0].insertId)];

  return demoTasks.map(({ title, description }) => {
    const status = randomNumber(4, 1);
    const priority = randomNumber(4, 1);
    const assignedUserId = assignedUserOptions[randomNumber(assignedUserOptions.length - 1)];
    const projectId = projects[randomNumber(projects.length - 1)][0].insertId;

    return insertTask({
      title,
      description,
      status,
      priority,
      projectId,
      createdUserId: masterAdminId,
      assignedUserId,
      teamId,
    });
  });
};

const createComments = (
  users: [ResultSetHeader, FieldPacket[]][],
  tasks: [ResultSetHeader, FieldPacket[]][],
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]>[] => {
  return demoComments.map((comment) => {
    const taskId = tasks[randomNumber(tasks.length - 1)][0].insertId;
    const userId = users[randomNumber(users.length - 1)][0].insertId;

    return insertComment({ comment, teamId, taskId, userId });
  });
};

const randomNumber = (max: number, min = 0): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
