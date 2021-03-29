import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Home from 'pages/Home';
import { getMovies } from 'api/movieService';
import { fetchGenres } from 'api/genreService';
import AppContextProvider, { AppContext } from 'context/AppContextManager';
import { genres, moviesResponse } from 'fixtures';

jest.mock('api/genreService');
jest.mock('api/movieService');
jest.mock('components/MovieList', () => () => <div data-testid="movie-list" />);

const mockGetMovies = getMovies as jest.MockedFunction<typeof getMovies>;
const mockFetchGenres = fetchGenres as jest.MockedFunction<typeof fetchGenres>;
const setGenres = jest.fn();

describe('Home', () => {
  test('should render loading spinner', async () => {
    const history = createMemoryHistory();
    history.push(`/movies`);
    act(() => {
      render(
        <AppContext.Provider value={{ genres: [], setGenres }}>
          <Router history={history}>
            <Home />
          </Router>
          ,
        </AppContext.Provider>,
      );
    });

    mockFetchGenres.mockResolvedValueOnce(genres);
    mockGetMovies.mockResolvedValueOnce(moviesResponse);
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('should render movie list', async () => {
    const history = createMemoryHistory();
    history.push(`/movies`);
    act(() => {
      render(
        <HelmetProvider>
          <AppContextProvider>
            <Router history={history}>
              <Home />
            </Router>
            ,
          </AppContextProvider>
        </HelmetProvider>,
      );
    });
    mockFetchGenres.mockResolvedValueOnce(genres);
    mockGetMovies.mockResolvedValueOnce(moviesResponse);
    await waitFor(() => expect(screen.getByTestId('movie-list')).toBeInTheDocument());
  });
});
