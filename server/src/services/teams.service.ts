import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../db/database';

interface Team extends RowDataPacket {
  teamId: number;
  teamName: string;
}

export const insertTeam = async (teamName: string): Promise<[ResultSetHeader, FieldPacket[]]> => {
  return db.execute('INSERT INTO teams (teamName) VALUES (?)', [teamName]);
};

export const selectTeamByTeamName = async (teamName: string): Promise<[Team[], FieldPacket[]]> => {
  return db.execute(`SELECT * FROM teams WHERE teamName = "${teamName}"`);
};
