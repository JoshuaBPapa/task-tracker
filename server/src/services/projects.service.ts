import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../db/database';
import { CreateProjectReqBody, GetProjectsReqParams, Project, SelectCountResults } from '../types';
import { Pagination } from '../classes';
import { buildOrderByQueryString, buildSearchQueryString } from '../helpers';

interface InsertProjectValues extends CreateProjectReqBody {
  teamId: number;
}

interface UpdateProjectValues extends InsertProjectValues {
  id: number;
}

type SelectProjectsResults = RowDataPacket & Project;

export const insertProject = (
  projectData: InsertProjectValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute('INSERT INTO projects (name, teamId) VALUES (?,?)', [
    projectData.name,
    projectData.teamId,
  ]);
};

export const updateProjectById = (
  projectData: UpdateProjectValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(
    `UPDATE 
      projects 
    SET 
      name = "${projectData.name}" 
    WHERE 
      id = ${projectData.id} AND teamId = ${projectData.teamId}`
  );
};

export const deleteProjectById = (
  projectId: number,
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(`DELETE FROM projects WHERE id = ${projectId} AND teamId = ${teamId}`);
};

export const selectProjectsPaginated = (
  teamId: number,
  params: GetProjectsReqParams
): Promise<[SelectProjectsResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(params.page);
  const orderByQueryString = buildOrderByQueryString(params.orderBy);
  const searchQueryString = buildSearchQueryString(params.search, 'name');

  return db.execute(`
    SELECT 
      p.id, p.name, 
      COUNT(t.projectId) as 'totalTasks', 
      COUNT(CASE t.priority WHEN 4 THEN 1 ELSE null END) as 'severeTasks',
      COUNT(t.assignedUserId) as 'assignedTasks',
      COUNT(CASE t.status WHEN 1 THEN 1 ELSE null END) as 'tasksNotStarted'
    FROM 
      projects AS p
    LEFT JOIN
      tasks AS t
    ON
      p.id = t.projectId
    WHERE
      p.teamId = ${teamId} ${searchQueryString}
    GROUP BY
      p.id
    ${orderByQueryString}
    ${paginationQueryString}`);
};

export const countTotalProjects = (
  teamId: number,
  params: GetProjectsReqParams
): Promise<[SelectCountResults[], FieldPacket[]]> => {
  const searchQueryString = buildSearchQueryString(params.search, 'name');

  return db.execute(`    
    SELECT
      COUNT(*) AS total
    FROM
      projects
    WHERE
      teamId = ${teamId} ${searchQueryString}`);
};

export const selectProjectById = (
  teamId: number,
  projectId: number
): Promise<[SelectProjectsResults[], FieldPacket[]]> => {
  return db.execute(`
    SELECT 
      p.id, p.name,
      COUNT(t.projectId) as 'totalTasks', 
      COUNT(CASE t.priority WHEN 4 THEN 1 ELSE null END) as 'severeTasks',
      COUNT(t.assignedUserId) as 'assignedTasks',
      COUNT(CASE t.status WHEN 1 THEN 1 ELSE null END) as 'tasksNotStarted'
    FROM 
      projects AS p
    LEFT JOIN
      tasks AS t
    ON
      p.id = t.projectId
    WHERE
      p.teamId = ${teamId} AND p.id = ${projectId}
    GROUP BY
      p.id`);
};
