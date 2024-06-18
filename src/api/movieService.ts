import { AxiosRequestConfig } from 'axios';
import { GenreResponse, ImageResponse, Movie, MoviesResponse, PersonnelResponse } from 'types';
import { axiosInstance } from 'api/httpClient';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const MOVIE_PATH = '/movie';
const GENRE_LIST_PATH = `/genre${MOVIE_PATH}/list`;

export const MOVIE_DB_IMAGE_URL: {
  small: string;
  medium: string;
  large: string;
  original: string;
} = {
  small: `${MOVIE_IMAGE_BASE_URL}w185`,
  medium: `${MOVIE_IMAGE_BASE_URL}w300`,
  large: `${MOVIE_IMAGE_BASE_URL}w1280`,
  original: `${MOVIE_IMAGE_BASE_URL}original`,
};

const fetchData = async <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
  const resp = await axiosInstance.get<T>(path, config);
  return resp.data as T;
};

export const getMovies = (params: { category: string; page: number }) =>
  fetchData<MoviesResponse>(`${MOVIE_PATH}/${params.category}`, { params: { page: params.page } });

export const searchMovies = (params: { query: string; page: number }) =>
  fetchData<MoviesResponse>(`/search/movie`, {
    params: { query: params.query, page: params.page },
  });

export const getGenres = () => fetchData<GenreResponse>(GENRE_LIST_PATH);

export const getMovie = (id: string) => fetchData<Movie>(`${MOVIE_PATH}/${id}`);

export const getActors = (id: string) =>
  fetchData<PersonnelResponse>(`${MOVIE_PATH}/${id}/credits`);

export const getMovieImages = (id: string) =>
  fetchData<ImageResponse>(`${MOVIE_PATH}/${id}/images`, { params: { language: 'null' } });

export const getRecommendations = (id: string) =>
  fetchData<MoviesResponse>(`${MOVIE_PATH}/${id}/recommendations`, {
    params: {
      language: 'null',
      page: 1,
    },
  });
