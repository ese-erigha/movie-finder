import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Search from 'pages/Search';
import { searchMovies } from 'api/movieService';
import { fetchGenres } from 'api/genreService';
import AppContextProvider, { AppContext } from 'context/AppContextManager';
import { genres, moviesResponse } from 'fixtures';
import userEvent from '@testing-library/user-event';
import { route } from 'routes';

jest.mock('api/genreService');
jest.mock('api/movieService');

const mockSearchMovies = searchMovies as jest.MockedFunction<typeof searchMovies>;
const mockFetchGenres = fetchGenres as jest.MockedFunction<typeof fetchGenres>;
const setGenres = jest.fn();
const mockHistoryPush = jest.fn();
const query = 'red';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  __esModule: true,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Search', () => {
  beforeEach(() => {
    mockFetchGenres.mockResolvedValueOnce(genres);
  });

  test('should render loading spinner', async () => {
    mockSearchMovies.mockResolvedValueOnce(moviesResponse);
    const history = createMemoryHistory();
    history.push(`/search/${query}`);
    render(
      <HelmetProvider>
        <AppContext.Provider value={{ genres: [], setGenres }}>
          <Router history={history}>
            <Route path={route.search}>
              <Search />
            </Route>
          </Router>
        </AppContext.Provider>
      </HelmetProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('spinner')).toBeInTheDocument());
  });

  test('should render movie list when search results contain at least one movie', async () => {
    mockSearchMovies.mockResolvedValueOnce(moviesResponse);
    const history = createMemoryHistory();
    history.push(`/search/${query}`);
    render(
      <HelmetProvider>
        <AppContextProvider>
          <Router history={history}>
            <Route path={route.search}>
              <Search />
            </Route>
          </Router>
        </AppContextProvider>
      </HelmetProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('movie-list')).toBeInTheDocument());

    // UI should containg heading with correct info when search results is present
    const searchString = `Search results for "${query}"`;
    expect(screen.getByText(new RegExp(searchString))).toBeInTheDocument();

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(6);
    expect(items[0].firstChild?.textContent).toEqual('←');
    expect(items[1].firstChild?.textContent).toEqual('1');
    expect(items[2].firstChild?.textContent).toEqual('2');
    expect(items[3].firstChild?.textContent).toEqual('3');
    expect(items[4].firstChild?.textContent).toEqual('4');
    expect(items[5].firstChild?.textContent).toEqual('→');

    window.scrollTo = jest.fn();

    // Fire click event on pagination
    userEvent.click(screen.getByText(/4/));
    expect(mockHistoryPush).toHaveBeenCalledWith(`/search/${query}/4`);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('should render "no search result" when search result contains no movie', async () => {
    mockSearchMovies.mockResolvedValueOnce({ ...moviesResponse, results: [] });

    const history = createMemoryHistory();
    history.push(`/search/${query}`);
    render(
      <HelmetProvider>
        <AppContextProvider>
          <Router history={history}>
            <Route path={route.search}>
              <Search />
            </Route>
          </Router>
        </AppContextProvider>
      </HelmetProvider>,
    );
    await waitFor(() => expect(screen.queryByTestId('movie-list')).not.toBeInTheDocument());
    const searchString = `No search results for "${query}"`;
    expect(screen.getByText(new RegExp(searchString))).toBeInTheDocument();
  });
});
