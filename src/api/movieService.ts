import { AxiosRequestConfig } from 'axios';
import { axiosMovies as axios } from './axios';

const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const MOVIE_IMAGE_URL: { small: string; medium: string; large: string; original: string } = {
  small: `${MOVIE_IMAGE_BASE_URL}w185`,
  medium: `${MOVIE_IMAGE_BASE_URL}w300`,
  large: `${MOVIE_IMAGE_BASE_URL}w1280`,
  original: `${MOVIE_IMAGE_BASE_URL}original`,
};

const fetchData = (path: string, config?: AxiosRequestConfig) => axios.get(path, config);

export const getMovies = (params: { category: string; page: number }) =>
  fetchData(`/movie/${params.category}`, { params: { page: params.page } });

export const searchMovies = (params: { query: string; page: number }) =>
  fetchData(`/search/movie`, {
    params: { query: params.query, page: params.page },
  });

export const getGenres = () => fetchData('/genre/movie/list');

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
