import { RowDataPacket } from 'mysql2';

export interface SelectCountResults extends RowDataPacket {
  total: number;
}
