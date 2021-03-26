import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import MovieList, { Props } from 'components/MovieList';
import { movie, genres } from 'fixtures';
import { Mock } from 'ts-mockery';

const handlePageChange = jest.fn();

const props = Mock.of<Props>({
  movies: [movie],
  genres,
  pageCount: 3,
  initialPage: 0,
});

describe('MovieList', () => {
  test('should render list of movies for user', () => {
    render(<MovieList {...props} onPageChange={handlePageChange} />);
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });

  test('should render movie card for user', () => {
    render(<MovieList {...props} onPageChange={handlePageChange} />);
    const listElement = screen.getByTestId('movie-list');
    expect(listElement.childElementCount).toEqual(1);
  });

  test('should render pagination for user', () => {
    render(<MovieList {...props} onPageChange={handlePageChange} />);
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(5);
    expect(items[0].firstChild?.textContent).toEqual('←');
    expect(items[1].firstChild?.textContent).toEqual('1');
    expect(items[2].firstChild?.textContent).toEqual('2');
    expect(items[3].firstChild?.textContent).toEqual('3');
    expect(items[4].firstChild?.textContent).toEqual('→');

    // Fire click event on pagination
    fireEvent.click(items[2].firstChild!);
    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith({ selected: 1 });
  });

  test('should render blank when movies are empty', () => {
    const updatedProps = { ...props, movies: [] };
    render(<MovieList {...updatedProps} onPageChange={handlePageChange} />);
    expect(screen.queryByTestId('movie-list')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });
});
