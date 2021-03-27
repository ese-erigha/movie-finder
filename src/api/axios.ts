import axios from 'axios';
import * as config from '../config';

// https://www.npmjs.com/package/nock#axios
axios.defaults.adapter = require('axios/lib/adapters/http');

const axiosCreate = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: 'en-US',
  },
});
export default axiosCreate;
