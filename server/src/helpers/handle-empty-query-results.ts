import { ResultSetHeader } from 'mysql2';
import { HttpException } from '../exceptions/http-exception';

export const handleEmptyQueryResults = (resultsHeader: ResultSetHeader): void | never => {
  if (!resultsHeader.affectedRows) throw new HttpException(404, 'Resource not found');
};
