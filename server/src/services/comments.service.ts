import { ResultSetHeader, FieldPacket, RowDataPacket } from 'mysql2';
import { Comments, CreateCommentReqBody, SelectCountResults } from '../types';
import db from '../db/database';
import { Pagination } from '../classes';

interface InsertCommentValues extends CreateCommentReqBody {
  teamId: number;
  userId: number;
}

type SelectCommentsResults = RowDataPacket & Comments;

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

export const selectCommentsPaginated = (
  teamId: number,
  taskId: number,
  pageQuery: string
): Promise<[SelectCommentsResults[], FieldPacket[]]> => {
  const paginationQueryString = Pagination.buildQueryString(pageQuery);

  return db.execute(`
    SELECT
      c.id, c.comment, c.dateTimeCreated,
      JSON_OBJECT(
        'id', u.id,
        'firstName', u.firstName,
        'lastName', u.lastName,
        'jobTitle', u.jobTitle,
        'pictureColour', u.pictureColour
      ) AS postedBy
    FROM
      comments AS c
    LEFT JOIN
      users AS u
    ON
      c.userId = u.id
    WHERE
      c.teamId = ${teamId} AND c.taskId = ${taskId}
    GROUP BY
      c.id
    ORDER BY
      c.dateTimeCreated DESC
    ${paginationQueryString}`);
};

export const countTotalComments = (
  teamId: number,
  taskId: number
): Promise<[SelectCountResults[], FieldPacket[]]> => {
  return db.execute(`
    SELECT
      COUNT(*) AS total
    FROM
      comments
    WHERE
      teamId = ${teamId} AND taskId = ${taskId}`);
};
