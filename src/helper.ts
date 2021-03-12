export const routeFilters = [
  { key: 'popular', value: 'Popular' },
  { key: 'now_playing', value: 'Now playing' },
  { key: 'top_rated', value: 'Top rated' },
  { key: 'upcoming', value: 'Upcoming' },
];

export const getPathsFromCurrentLocation = (pathname: string) => {
  const paths = pathname.split('/');
  const basePath = paths[1].toLowerCase();
  const param = paths[2] ?? null;
  return { basePath, param };
};
