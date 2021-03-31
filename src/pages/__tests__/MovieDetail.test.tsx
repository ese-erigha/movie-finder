import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MovieDetail from 'pages/MovieDetail';
import { getActors, getMovie, getMovieImages, getRecommendations } from 'api/movieService';
import { fetchGenres } from 'api/genreService';
import AppContextProvider, { AppContext } from 'context/AppContextManager';
import { genres, imageResponse, movie, moviesResponse, personnelResponse } from 'fixtures';

jest.mock('api/genreService');
jest.mock('api/movieService');
jest.mock('components/movie/BackDrop', () => () => <div data-testid="backdrop" />);
jest.mock('components/movie/Description', () => () => <div data-testid="description" />);
jest.mock('components/movie/Cast', () => () => <div data-testid="cast" />);
jest.mock('components/movie/Gallery', () => () => <div data-testid="gallery" />);
jest.mock('components/movie/RecommendationList', () => () => (
  <div data-testid="recommendationList" />
));

const mockGetMovie = getMovie as jest.MockedFunction<typeof getMovie>;
const mockGetActors = getActors as jest.MockedFunction<typeof getActors>;
const mockGetMovieImages = getMovieImages as jest.MockedFunction<typeof getMovieImages>;
const mockGetRecommendations = getRecommendations as jest.MockedFunction<typeof getRecommendations>;
const mockFetchGenres = fetchGenres as jest.MockedFunction<typeof fetchGenres>;
const setGenres = jest.fn();

describe('Home', () => {
  beforeEach(() => {
    mockGetMovieImages.mockResolvedValueOnce(imageResponse);
    mockGetActors.mockResolvedValueOnce(personnelResponse);
    mockFetchGenres.mockResolvedValueOnce(genres);
    mockGetMovie.mockResolvedValueOnce(movie);
    mockGetRecommendations.mockResolvedValueOnce(moviesResponse);
  });
  test('should render loading spinner', async () => {
    const history = createMemoryHistory();
    history.push(`/movie/1234567`);
    act(() => {
      render(
        <HelmetProvider>
          <AppContext.Provider value={{ genres: [], setGenres }}>
            <Router history={history}>
              <MovieDetail />
            </Router>
          </AppContext.Provider>
        </HelmetProvider>,
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('should render movie detail', async () => {
    const history = createMemoryHistory();
    history.push(`/movie/1234567`);
    act(() => {
      render(
        <HelmetProvider>
          <AppContextProvider>
            <Router history={history}>
              <MovieDetail />
            </Router>
          </AppContextProvider>
        </HelmetProvider>,
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId('backdrop')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
      expect(screen.getByTestId('cast')).toBeInTheDocument();
      expect(screen.getByTestId('gallery')).toBeInTheDocument();
      expect(screen.getByTestId('recommendationList')).toBeInTheDocument();
    });
  });
});
