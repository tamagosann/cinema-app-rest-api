export const tmdbPathBuilder = (
  basePath: string,
  queries?: { name: string; value: string | number }[],
) => {
  const api_key = process.env.API_KEY;
  if (!queries || queries.length === 0) return `${basePath}?api_key=${api_key}`;
  const queriesToPath = queries
    .filter((query) => {
      return !!query.value;
    })
    .map((query) => {
      return `${query.name}=${query.value}`;
    })
    .join('&');
  return `${basePath}?api_key=${api_key}&${queriesToPath}`;
};
