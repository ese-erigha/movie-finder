import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import SearchForm from 'components/SearchForm';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const renderWithRoute = (path: string) => {
  const history = createMemoryHistory();
  history.push(`${path}`);
  render(
    <Router history={history}>
      <SearchForm />
    </Router>,
  );
};

describe('SearchForm', () => {
  test('should render search form with empty input on movies route', () => {
    renderWithRoute('/movies');
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('');
  });

  test('should render search form with query on search route', () => {
    const query = 'red';
    renderWithRoute(`/search/${query}`);
    // Needed to cast since HTMLElement does not contain "value" property
    const input = screen.getByPlaceholderText('Search by movie title') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(query);
  });

  test('should change input value when user types', async () => {
    const query = 'red';
    renderWithRoute('/movies');
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('');

    userEvent.type(input, query);
    await waitFor(() => expect(input.value).toEqual(query));
  });
});
