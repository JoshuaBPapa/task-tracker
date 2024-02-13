export interface Comment {
  id: number;
  comment: string;
  dateTimeCreated: string;
  postedBy: {
    id: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    pictureColour: string;
  };
}
