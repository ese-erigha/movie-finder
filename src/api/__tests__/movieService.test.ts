import { axiosInstance } from 'api/httpClient';
import {
  getGenres,
  getMovies,
  searchMovies,
  getMovie,
  getActors,
  getMovieImages,
  getRecommendations,
} from 'api/movieService';
import { movie, genres, personnels, images } from 'fixtures';
import { ImageResponse, MoviesResponse, PersonnelResponse } from 'types';

jest.mock('api/httpClient');

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

const moviesResponse: MoviesResponse = {
  page: 1,
  total_results: 2,
  total_pages: 1,
  results: [movie, movie],
};

describe('movieService', () => {
  describe('getMovies', () => {
    test('should fetch movies', async () => {
      const param = { category: 'popular', page: 1 };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: moviesResponse });
      await expect(getMovies(param)).resolves.toEqual(moviesResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: param.page },
      });
    });
  });

  describe('searchMovies', () => {
    test('should search movies', async () => {
      const params = { query: 'sparrow', page: 1 };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: moviesResponse });
      await expect(searchMovies(params)).resolves.toEqual(moviesResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/search/movie', { params });
    });
  });

  describe('getGenres', () => {
    test('should get genres', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: { genres } });
      await expect(getGenres()).resolves.toEqual({ genres });
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/genre/movie/list', undefined);
    });
  });

  describe('getMovie', () => {
    test('should get movie by id', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: movie });
      await expect(getMovie(movie.id.toString())).resolves.toEqual(movie);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/movie/${movie.id}`, undefined);
    });
  });

  describe('getActors', () => {
    test('should get actors', async () => {
      const personnelResponse: PersonnelResponse = {
        id: movie.id.toString(),
        cast: personnels,
        crew: personnels,
      };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: personnelResponse });
      await expect(getActors(movie.id.toString())).resolves.toEqual(personnelResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/movie/${movie.id}/credits`, undefined);
    });
  });

  describe('getMovieImages', () => {
    test('should get images', async () => {
      const imageResponse: ImageResponse = {
        id: movie.id.toString(),
        backdrops: images,
        posters: images,
      };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: imageResponse });
      await expect(getMovieImages(movie.id.toString())).resolves.toEqual(imageResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/movie/${movie.id}/images`, {
        params: { language: 'null' },
      });
    });
  });

  describe('getRecommendations', () => {
    test('should get movie recommendations', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: moviesResponse });
      await expect(getRecommendations(movie.id.toString())).resolves.toEqual(moviesResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/movie/${movie.id}/recommendations`, {
        params: {
          language: 'null',
          page: 1,
        },
      });
    });
  });
});
