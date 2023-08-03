// convert query params like status=4,2,3 to an SQL query string like (status = 4 OR status = 2 OR status = 3)
export const buildFilterQueryString = (
  filterValues: string | undefined,
  column: string
): string => {
  if (!filterValues) return '';
  const convertedValues = filterValues.replace(/,/g, ` OR ${column} = `);
  return `AND (${column} = ${convertedValues})`;
};
