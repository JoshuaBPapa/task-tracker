import { FieldPacket, ResultSetHeader } from 'mysql2';
import { CreateTaskReqBody } from '../types';
import db from '../db/database';

interface InsertTaskValues extends CreateTaskReqBody {
  teamId: number;
  createdUserId: number;
}

interface UpdateTaskValues extends InsertTaskValues {
  id: number;
}

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
      taskId = ${taskData.id} AND teamId = ${taskData.teamId}`
  );
};

export const deleteTaskById = (
  taskId: number,
  teamId: number
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute(`DELETE FROM tasks WHERE id = ${taskId} AND teamId = ${teamId}`);
};
