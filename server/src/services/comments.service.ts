import { ResultSetHeader, FieldPacket } from 'mysql2';
import { CreateCommentReqBody } from '../types';
import db from '../db/database';

interface InsertCommentValues extends CreateCommentReqBody {
  teamId: number;
  userId: number;
}

export const insertComment = (
  commentData: InsertCommentValues
): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute('INSERT INTO comments (comment, userId, taskId, teamId) VALUES (?,?,?,?)', [
    commentData.comment,
    commentData.userId,
    commentData.taskId,
    commentData.teamId,
  ]);
};
