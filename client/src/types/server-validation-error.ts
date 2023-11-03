export interface ServerValidationError {
  type: 'field';
  location: string;
  path: string;
  value: any;
  msg: string;
}
