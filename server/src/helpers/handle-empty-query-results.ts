import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { HttpException } from '../exceptions/http-exception';

export const handleEmptyQueryResults = (
  results: ResultSetHeader | RowDataPacket[]
): void | never => {
  if (Array.isArray(results)) {
    if (!results.length) throw new HttpException(404, 'Resource not found');
  } else {
    if (!results.affectedRows) throw new HttpException(404, 'Resource not found');
  }
};
