export interface Comment {
  id: number;
  comment: number;
  dateTimeCreated: string;
  postedBy: {
    userId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    pictureColour: string;
  };
}
