import { getGenres } from 'api/movieService';
import { Genre, GenreResponse } from 'types';

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

export const fetchGenres = async (genres: Genre[]) => {
  let movieGenres: GenreResponse = {};
  if (!genres.length) {
    movieGenres = await getGenres();
  }
  return movieGenres?.genres ?? genres;
};

export const getInitialPage = (page?: string) => (page ? parseInt(page, 10) - 1 : 0);
