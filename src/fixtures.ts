import { Mock } from 'ts-mockery';
import { Movie } from 'types';

export const movie = Mock.of<Movie>({
  id: 12345,
  poster_path: 'path',
  title: 'title',
  vote_average: 2,
  genre_ids: [1, 2, 3],
});

export const genres = [
  { id: 1, name: 'crime' },
  { id: 2, name: 'thriller' },
  { id: 3, name: 'action' },
];
