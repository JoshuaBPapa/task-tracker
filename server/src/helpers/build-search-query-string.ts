export const buildSearchQueryString = (search: string | undefined, column: string): string => {
  if (!search) return '';
  return `AND ${column} LIKE '${search}%'`;
};
