import { axiosInstance } from 'api/httpClient';
import * as config from '../../config';

describe('axiosInstance', () => {
  test('should be defined', () => {
    expect(axiosInstance.defaults.baseURL).toEqual(config.MOVIE_DB_BASE_URL);
    expect(axiosInstance.defaults.params.api_key).toEqual(config.MOVIE_DB_API_KEY);
    expect(axiosInstance.defaults.params.language).toEqual('en-US');
  });
});
