import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import LoadingSpinner from 'components/LoadingSpinner';
import Routes from '../routes';

jest.mock('pages/Home', () => () => <div>Home</div>);
jest.mock('pages/Search', () => () => <div>Search</div>);
jest.mock('pages/MovieDetail', () => () => <div>MovieDetail</div>);

const renderWithRouter = (route: string, component: JSX.Element) => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  history.push(route);
  render(
    <Router history={history}>
      <Suspense fallback={<LoadingSpinner />}>{component}</Suspense>
    </Router>,
  );
};

describe('routes', () => {
  test('should render home page', async () => {
    renderWithRouter('/movies', <Routes />);
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());
  });

  test('should render search page', async () => {
    renderWithRouter('/search/red', <Routes />);
    await waitFor(() => expect(screen.getByText('Search')).toBeInTheDocument());
  });

  test('should render movie detail page', async () => {
    renderWithRouter('/movie/1234', <Routes />);
    await waitFor(() => expect(screen.getByText('MovieDetail')).toBeInTheDocument());
  });
});
