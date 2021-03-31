import { Mock } from 'ts-mockery';
import {
  Genre,
  Movie,
  Personnel,
  Image,
  MoviesResponse,
  PersonnelResponse,
  ImageResponse,
} from 'types';

export const movie = Mock.of<Movie>({
  id: 12345,
  poster_path: '/poster_path',
  backdrop_path: '/backdrop_path',
  title: 'title',
  vote_average: 9.5,
  genre_ids: [1, 2, 3],
  release_date: '2021-03-03',
  overview: 'overview',
  tagline: 'A quest to save her world.',
  runtime: 107,
  budget: 200000000,
  genres: [
    { id: 16, name: 'Animation' },
    { id: 12, name: 'Adventure' },
    { id: 14, name: 'Fantasy' },
  ],
});

export const moviesResponse: MoviesResponse = {
  page: 1,
  total_results: 2,
  total_pages: 4,
  results: [movie, { ...movie, id: 123, title: 'titlee' }],
};

export const genres: Genre[] = [
  { id: 1, name: 'crime' },
  { id: 2, name: 'thriller' },
  { id: 3, name: 'action' },
];

export const personnel = Mock.of<Personnel>({
  name: 'actor',
  character: 'character',
  profile_path: '/path',
});
export const personnels = Mock.of<Personnel[]>(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
    (item) => ({ ...personnel, id: item } as Personnel),
  ),
);

export const personnelResponse: PersonnelResponse = {
  id: movie.id.toString(),
  cast: personnels,
  crew: personnels,
};

const image = Mock.of<Image>({
  file_path: '/file-path',
});
export const images: Image[] = [image, image];
export const imageResponse: ImageResponse = {
  id: movie.id.toString(),
  backdrops: images,
  posters: images,
};

export const axiosError = {
  message: 'error-message',
  code: '400',
};
