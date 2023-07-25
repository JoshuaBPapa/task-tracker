import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  teamId: number;
  authLevel: number;
  jobTitle: string;
  password: string;
  pictureColour: string;
}
