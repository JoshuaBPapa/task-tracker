export const buildOrderByQueryString = (orderByParam: string | undefined): string => {
  if (!orderByParam) return '';
  const [column, direction] = orderByParam.split('-');

  return `ORDER BY ${column} ${direction}`;
};
