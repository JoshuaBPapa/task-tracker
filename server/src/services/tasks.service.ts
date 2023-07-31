import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { CreateTaskReqBody, SelectCountResults, Tasks } from '../types';
import db from '../db/database';
import { Pagination } from '../classes';

interface InsertTaskValues extends CreateTaskReqBody {
  teamId: number;
  createdUserId: number;
}

interface UpdateTaskValues extends InsertTaskValues {
  id: number;
}

interface SelectTasksResults extends RowDataPacket, Tasks {}

export const insertTask = (
  taskData: InsertTaskValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    'INSERT INTO tasks (title, description, status, priority, projectId, createdUserId, assignedUserId, teamId) VALUES (?,?,?,?,?,?,?,?)',
    [
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.priority,
      taskData.projectId,
      taskData.createdUserId,
      taskData.assignedUserId,
      taskData.teamId,
    ]
  );
};

export const updateTasksById = (
  taskData: UpdateTaskValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    `UPDATE 
      tasks 
    SET 
      title = "${taskData.title}", description = "${taskData.description}", status = ${taskData.status}, priority = ${taskData.priority}, assignedUserId = ${taskData.assignedUserId}
    WHERE 
      id = ${taskData.id} AND teamId = ${taskData.teamId}`
  );
};

export const deleteTaskById = (
  taskId: number,
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(`DELETE FROM tasks WHERE id = ${taskId} AND teamId = ${teamId}`);
};

export const selectTasksPaginated = (
  teamId: number,
  pageParam: string
): Promise<[SelectTasksResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(pageParam);

  return db.execute(`
    SELECT
      t.id, t.title, t.status, t.priority, t.dateTimeCreated, t.dateTimeUpdated,
      JSON_OBJECT(
        'id', u.id, 
        'firstName', u.firstName, 
        'lastName', u.lastName, 
        'jobTitle', u.jobTitle, 
        'pictureColour', u.pictureColour
      ) assignedUser
    FROM 
      tasks AS t
    JOIN
      users AS u
    ON
      u.id = t.assignedUserId
    WHERE 
      t.teamId = ${teamId}
    GROUP BY 
      t.id
    ${paginationQueryString}`);
};

export const countTotalTasks = (teamId: number): Promise<[SelectCountResults[], FieldPacket[]]> => {
  return db.execute(`    
    SELECT 
      COUNT(*) AS total 
    FROM 
      tasks 
    WHERE 
      teamId = ${teamId}`);
};
