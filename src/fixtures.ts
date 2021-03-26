import { Mock } from 'ts-mockery';
import { Genre, Movie, Personnel } from 'types';

export const movie = Mock.of<Movie>({
  id: 12345,
  poster_path: 'path',
  title: 'title',
  vote_average: 2,
  genre_ids: [1, 2, 3],
});

export const genres: Genre[] = [
  { id: 1, name: 'crime' },
  { id: 2, name: 'thriller' },
  { id: 3, name: 'action' },
];

export const personnel = Mock.of<Personnel>({
  name: 'name',
  character: 'character',
  profile_path: '/path',
});
