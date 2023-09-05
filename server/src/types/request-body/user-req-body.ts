export interface CreateUserReqBody {
  firstName: string;
  lastName: string;
  username: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
  authLevel: number;
}

export interface UpdateUserReqBody
  extends Omit<CreateUserReqBody, 'password' | 'confirmPassword' | 'username'> {}

export interface UpdateUserPassword {
  password: string;
  confirmPassword: string;
}
