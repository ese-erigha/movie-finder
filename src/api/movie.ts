const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const MOVIE_IMAGE_URL: { small: string; medium: string; large: string; original: string } = {
  small: `${MOVIE_IMAGE_BASE_URL}w185`,
  medium: `${MOVIE_IMAGE_BASE_URL}w300`,
  large: `${MOVIE_IMAGE_BASE_URL}w1280`,
  original: `${MOVIE_IMAGE_BASE_URL}original`,
};
