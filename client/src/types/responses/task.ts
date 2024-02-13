import { AssignedUser } from '../assigned-user';

export interface Task {
  id: number;
  title: string;
  status: 1 | 2 | 3 | 4;
  priority: 1 | 2 | 3 | 4;
  dateTimeCreated: string;
  dateTimeUpdated: string;
  assignedUser: null | AssignedUser;
  project: {
    id: number;
    name: string;
  };
}

export interface TaskDetailed extends Task {
  description: string;
}
