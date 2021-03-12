import { AxiosRequestConfig } from 'axios';
import { Genres, MovieResponse } from 'types';
import axiosInstance from './axios';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
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
  fetchData<MovieResponse>(`/movie/${params.category}`, { params: { page: params.page } });

export const searchMovies = (params: { query: string; page: number }) =>
  fetchData(`/search/movie`, {
    params: { query: params.query, page: params.page },
  });

export const getGenres = () => fetchData<Genres>('/genre/movie/list');

export const getMovie = (id: string) => fetchData(`/movie/${id}`);

export const getActors = (id: string) => fetchData(`/movie/${id}/credits`);

export const getMovieImages = (id: string) =>
  fetchData(`/movie/${id}/images`, { params: { language: 'null' } });

export const getRecommendations = (id: string) =>
  fetchData(`/movie/${id}/recommendations`, {
    params: {
      language: 'null',
      page: 1,
    },
  });
