export class Pagination<T> {
  results: T[] = [];
  total: number;
  page: number;

  constructor(results: T[], total: number, pageParam: string) {
    this.results = results;
    this.total = total;
    this.page = parseInt(pageParam) || 1;
  }

  static buildQueryString(pageParam: string): string {
    const pageNumber = parseInt(pageParam) || 1;
    const limit = ((pageNumber - 1) * 10).toString();

    return `LIMIT ${limit}, 10`;
  }
}
