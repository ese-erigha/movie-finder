import { Genre } from 'types';

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

export const buildGenreText = (genres: Genre[], movieGenreIds?: number[]) => {
  if (!movieGenreIds?.length) return '';
  return movieGenreIds
    .map((id) => {
      const item = genres.find((genre) => genre.id === id);
      return item ? item.name : null;
    })
    .join(', ');
};

export const getInitialPage = (page?: string) => (page ? parseInt(page, 10) - 1 : 0);

export const formatVote = (vote: number) => parseFloat(vote.toFixed(1));
