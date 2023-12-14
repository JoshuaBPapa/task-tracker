export interface Page<T> {
  results: T[];
  total: number;
  page: number;
}
