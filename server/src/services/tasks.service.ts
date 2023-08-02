import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { CreateTaskReqBody, GetTasksReqParams, SelectCountResults, Tasks } from '../types';
import db from '../db/database';
import { Pagination } from '../classes';
import {
  buildFilterQueryString,
  buildOrderByQueryString,
  buildSearchQueryString,
} from '../helpers';

interface InsertTaskValues extends CreateTaskReqBody {
  teamId: number;
  createdUserId: number;
}

interface UpdateTaskValues extends InsertTaskValues {
  id: number;
}

type SelectTasksResults = RowDataPacket & Tasks;

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
  params: GetTasksReqParams
): Promise<[SelectTasksResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(params.page);
  const orderByQueryString = buildOrderByQueryString(params.orderBy);
  const statusFilterQueryString = buildFilterQueryString(params.status, 'status');
  const priorityFilterQueryString = buildFilterQueryString(params.priority, 'priority');
  const searchQueryString = buildSearchQueryString(params.search, 'title');

  return db.execute(`
    SELECT
      t.id, t.title, t.status, t.priority, t.dateTimeCreated, t.dateTimeUpdated,
      JSON_OBJECT(
        'id', assignedUser.id, 
        'firstName', assignedUser.firstName, 
        'lastName', assignedUser.lastName, 
        'jobTitle', assignedUser.jobTitle, 
        'pictureColour', assignedUser.pictureColour
      ) assignedUser
    FROM 
      tasks AS t
    JOIN
      users AS assignedUser
    ON
      assignedUser.id = t.assignedUserId
    WHERE 
      t.teamId = ${teamId} ${statusFilterQueryString} ${priorityFilterQueryString} ${searchQueryString} 
    GROUP BY 
      t.id
    ${orderByQueryString}
    ${paginationQueryString}`);
};

export const countTotalTasks = (
  teamId: number,
  params: GetTasksReqParams
): Promise<[SelectCountResults[], FieldPacket[]]> => {
  const statusFilterQueryString = buildFilterQueryString(params.status, 'status');
  const priorityFilterQueryString = buildFilterQueryString(params.priority, 'priority');
  const searchQueryString = buildSearchQueryString(params.search, 'title');

  return db.execute(`    
    SELECT 
      COUNT(*) AS total 
    FROM 
      tasks 
    WHERE 
      teamId = ${teamId} ${statusFilterQueryString} ${priorityFilterQueryString} ${searchQueryString}`);
};
