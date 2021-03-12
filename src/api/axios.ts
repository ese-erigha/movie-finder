import axios from 'axios';
import * as config from '../config';

export const axiosMovies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: 'en-US',
  },
});
