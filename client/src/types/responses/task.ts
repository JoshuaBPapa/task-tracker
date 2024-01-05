export interface Task {
  id: number;
  title: string;
  status: number;
  priority: number;
  dateTimeCreated: string;
  dateTimeUpdated: string;
  assignedUser: {
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
