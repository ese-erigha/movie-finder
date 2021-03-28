import axios from 'axios';
import * as config from '../config';

// https://www.npmjs.com/package/nock#axios
axios.defaults.adapter = require('axios/lib/adapters/http');

export const axiosInstance = axios.create({
  baseURL: config.MOVIE_DB_BASE_URL,
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: 'en-US',
  },
});
