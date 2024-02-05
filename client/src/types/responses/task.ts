export interface Task {
  id: number;
  title: string;
  status: 1 | 2 | 3 | 4;
  priority: 1 | 2 | 3 | 4;
  dateTimeCreated: string;
  dateTimeUpdated: string;
  assignedUser: null | {
    id: number;
    jobTitle: string;
    lastName: string;
    firstName: string;
    pictureColour: string;
  };
  project: {
    id: number;
    name: string;
  };
}
