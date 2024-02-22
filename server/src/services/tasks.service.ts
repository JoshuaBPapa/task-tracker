import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import {
  CreateTaskReqBody,
  GetTasksReqParams,
  SelectCountResults,
  SingleTask,
  StatisticsTask,
  StatisticCounts,
  Tasks,
} from '../types';
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

type SelectSingleTaskResult = RowDataPacket & SingleTask;

type SelectStatisticCountsResults = RowDataPacket & StatisticCounts;

type SelectStatisticsTasksResults = RowDataPacket & StatisticsTask;

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
      title = "${taskData.title}", description = "${taskData.description}", status = ${taskData.status}, priority = ${taskData.priority}, assignedUserId = ${taskData.assignedUserId}, projectId = ${taskData.projectId}
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

const buildTableScopeQueryString = (
  tableScope: string | undefined,
  foreignKeyId: string | undefined
): string => {
  if (!tableScope || !foreignKeyId) return '';
  return `AND ${tableScope}Id = ${foreignKeyId}`;
};

export const selectTasksPaginated = (
  teamId: number,
  params: GetTasksReqParams,
  tableScope: string | undefined,
  foreignKeyId: string | undefined
): Promise<[SelectTasksResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(params.page);
  const orderByQueryString = buildOrderByQueryString(params.orderBy);
  const statusFilterQueryString = buildFilterQueryString(params.status, 'status');
  const priorityFilterQueryString = buildFilterQueryString(params.priority, 'priority');
  const searchQueryString = buildSearchQueryString(params.search, 'title');
  const tableScopeQueryString = buildTableScopeQueryString(tableScope, foreignKeyId);

  return db.execute(`
    SELECT
      t.id, t.title, t.status, t.priority, t.dateTimeCreated, t.dateTimeUpdated,
      CASE 
        WHEN 
          t.assignedUserId IS null THEN null
        ELSE 
          JSON_OBJECT(
            'id', assignedUser.id, 
            'firstName', assignedUser.firstName, 
            'lastName', assignedUser.lastName, 
            'jobTitle', assignedUser.jobTitle, 
            'pictureColour', assignedUser.pictureColour
          ) END AS assignedUser,
      JSON_OBJECT(
        'id', project.id,
        'name', project.name
      ) AS project
    FROM 
      tasks AS t
    LEFT JOIN
      users AS assignedUser
    ON
      assignedUser.id = t.assignedUserId
    LEFT JOIN
      projects AS project
    ON
      project.id = t.projectId 
    WHERE 
      t.teamId = ${teamId} ${statusFilterQueryString} ${priorityFilterQueryString} ${searchQueryString} ${tableScopeQueryString}
    GROUP BY 
      t.id
    ${orderByQueryString}
    ${paginationQueryString}`);
};

export const countTotalTasks = (
  teamId: number,
  params: GetTasksReqParams,
  tableScope: string | undefined,
  foreignKeyId: string | undefined
): Promise<[SelectCountResults[], FieldPacket[]]> => {
  const statusFilterQueryString = buildFilterQueryString(params.status, 'status');
  const priorityFilterQueryString = buildFilterQueryString(params.priority, 'priority');
  const searchQueryString = buildSearchQueryString(params.search, 'title');
  const tableScopeQueryString = buildTableScopeQueryString(tableScope, foreignKeyId);

  return db.execute(`    
    SELECT 
      COUNT(*) AS total 
    FROM 
      tasks 
    WHERE 
      teamId = ${teamId} ${statusFilterQueryString} ${priorityFilterQueryString} ${searchQueryString} ${tableScopeQueryString}`);
};

export const selectTaskById = (
  teamId: number,
  taskId: number
): Promise<[SelectSingleTaskResult[], FieldPacket[]]> => {
  return db.execute(`
    SELECT
      t.id, t.title, t.description, t.status, t.priority, t.dateTimeCreated, t.dateTimeUpdated,
      CASE 
        WHEN 
          t.assignedUserId IS null THEN null
        ELSE 
          JSON_OBJECT(
            'id', assignedUser.id, 
            'firstName', assignedUser.firstName, 
            'lastName', assignedUser.lastName, 
            'jobTitle', assignedUser.jobTitle, 
            'pictureColour', assignedUser.pictureColour
          ) END AS assignedUser,
      JSON_OBJECT(
        'id', project.id,
        'name', project.name
      ) AS project
    FROM 
      tasks AS t
    LEFT JOIN
      users AS assignedUser
    ON
      assignedUser.id = t.assignedUserId
    LEFT JOIN
      projects AS project
    ON
      project.id = t.projectId
    WHERE
      t.teamId = ${teamId} AND t.id = ${taskId}
    GROUP BY
      t.id`);
};

export const selectStatisticCounts = (
  teamId: number
): Promise<[SelectStatisticCountsResults[], FieldPacket[]]> => {
  return db.execute(`
    SELECT
      COUNT (*) AS totalTasksCount,
      COUNT(CASE priority WHEN 4 THEN 1 ELSE null END) as 'severeTasksCount',
      COUNT(CASE status WHEN 1 THEN 1 ELSE null END) as 'tasksNotStartedCount',
      COUNT(assignedUserId) as 'tasksAssignedCount',
      JSON_OBJECT(
        '1', COUNT(CASE status WHEN 1 THEN 1 ELSE null END),
        '2', COUNT(CASE status WHEN 2 THEN 1 ELSE null END), 
        '3', COUNT(CASE status WHEN 3 THEN 1 ELSE null END), 
        '4', COUNT(CASE status WHEN 4 THEN 1 ELSE null END)
      ) AS statusCounts
    FROM
      tasks
    WHERE
      teamId = ${teamId}
  `);
};

export const selectTopTenTasks = (
  teamId: number,
  orderByColumn: string
): Promise<[SelectStatisticsTasksResults[], FieldPacket[]]> => {
  return db.execute(`
    SELECT
      id, title, status, priority, dateTimeCreated, dateTimeUpdated
    FROM
      tasks
    WHERE
      teamId = ${teamId}
    ORDER BY
      ${orderByColumn} DESC
    LIMIT
      10
  `);
};
