export class Pagination<T> {
  results: T[] = [];
  total = 0;
  page = 1;

  constructor(results: T[], total: number, pageParam: string) {
    this.results = results;
    this.total = total;
    this.page = parseInt(pageParam);
  }

  static buildQueryString(pageParam: string): string {
    const pageNumber = parseInt(pageParam);
    const limit = ((pageNumber - 1) * 10).toString();

    return `LIMIT ${limit}, 10`;
  }
}
