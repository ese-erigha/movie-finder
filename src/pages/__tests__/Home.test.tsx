import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Home from 'pages/Home';
import { getMovies } from 'api/movieService';
import { fetchGenres } from 'api/genreService';
import AppContextProvider, { AppContext } from 'context/AppContextManager';
import { genres, moviesResponse } from 'fixtures';
import userEvent from '@testing-library/user-event';
import { route } from 'routes';

jest.mock('api/genreService');
jest.mock('api/movieService');

const mockGetMovies = getMovies as jest.MockedFunction<typeof getMovies>;
const category = 'popular';
const mockFetchGenres = fetchGenres as jest.MockedFunction<typeof fetchGenres>;
const setGenres = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  __esModule: true,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Home', () => {
  beforeEach(() => {
    mockFetchGenres.mockResolvedValueOnce(genres);
    mockGetMovies.mockResolvedValueOnce(moviesResponse);
  });
  // test('should render loading spinner', async () => {
  //   const history = createMemoryHistory();
  //   history.push(`/movies/${category}`);
  //   render(
  //     <HelmetProvider>
  //       <AppContext.Provider value={{ genres: [], setGenres }}>
  //         <Router history={history}>
  //           <Route path={route.home}>
  //             <Home />
  //           </Route>
  //         </Router>
  //       </AppContext.Provider>
  //     </HelmetProvider>
  //   );
  //   await waitFor(() => expect(screen.getByTestId('spinner')).toBeInTheDocument());
  // });

  test('should render movie list', async () => {
    const history = createMemoryHistory();
    history.push(`/movies/${category}/1`);
    render(
      <HelmetProvider>
        <AppContextProvider>
          <Router history={history}>
            <Route path={route.home}>
              <Home />
            </Route>
          </Router>
        </AppContextProvider>
      </HelmetProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('movie-list')).toBeInTheDocument());
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
    expect(mockHistoryPush).toHaveBeenCalledWith(`/movies/${category}/4`);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
