export interface Tasks {
  id: number;
  title: string;
  status: number;
  priority: number;
  assignedUser: {
    userId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    pictureColour: string;
  };
  dateTimeCreated: string;
  dateTimeUpdated: string;
}
