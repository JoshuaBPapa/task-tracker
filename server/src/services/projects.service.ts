import { FieldPacket, ResultSetHeader } from 'mysql2';
import db from '../db/database';
import { CreateProjectReqBody } from '../types';

interface InsertProjectValues extends CreateProjectReqBody {
  teamId: number;
}

interface UpdateProjectValues extends InsertProjectValues {
  id: number;
}

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
