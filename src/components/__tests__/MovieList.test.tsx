import React from 'react';
import { render, screen, within } from '@testing-library/react';

import MovieList, { Props } from 'components/MovieList';
import { movie, genres } from 'fixtures';

const onPageChangeHandler = jest.fn();

const props: Props = {
  movies: [movie],
  genres,
  pageCount: 3,
  initialPage: 0,
  onPageChange: onPageChangeHandler,
};

describe('MovieList', () => {
  test('should render list of movies for user', () => {
    render(<MovieList {...props} />);
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });

  test('should render movie card for user', () => {
    render(<MovieList {...props} />);
    const listElement = screen.getByTestId('movie-list');
    expect(listElement.childElementCount).toEqual(1);
  });

  test('should render pagination for user', () => {
    render(<MovieList {...props} />);
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(5);
    expect(items[0].firstChild?.textContent).toEqual('←');
    expect(items[1].firstChild?.textContent).toEqual('1');
    expect(items[2].firstChild?.textContent).toEqual('2');
    expect(items[3].firstChild?.textContent).toEqual('3');
    expect(items[4].firstChild?.textContent).toEqual('→');
  });

  test('should render blank when movies are empty', () => {
    const updatedProps = { ...props, movies: [] };
    render(<MovieList {...updatedProps} />);
    expect(screen.queryByTestId('movie-list')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });
});
