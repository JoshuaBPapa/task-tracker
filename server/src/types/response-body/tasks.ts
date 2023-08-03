export interface Tasks {
  id: number;
  title: string;
  status: number;
  priority: number;
  assignedUser: {
    id: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    pictureColour: string;
  };
  project: {
    id: number;
    name: number;
  };
  dateTimeCreated: string;
  dateTimeUpdated: string;
}
