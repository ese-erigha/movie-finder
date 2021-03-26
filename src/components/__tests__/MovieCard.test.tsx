import React from 'react';
import { render, screen } from '@testing-library/react';

import MovieCard from 'components/MovieCard';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { genres, movie } from 'fixtures';
import { buildGenreText } from 'helper';

const mockBuildGenreText = buildGenreText as jest.MockedFunction<typeof buildGenreText>;

jest.mock('../../helper');

describe('MovieCard', () => {
  const runCommonAssertions = () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `${MOVIE_DB_IMAGE_URL.medium}${movie.poster_path}`);
    expect(img).toHaveAttribute('alt', 'title');
    expect(screen.getByTestId('link')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(mockBuildGenreText).toHaveBeenCalledWith(genres, movie.genre_ids);
  };

  test('should render all component when all values are present', () => {
    mockBuildGenreText.mockReturnValueOnce(genres[0].name);
    render(<MovieCard movie={movie} genres={genres} />);
    runCommonAssertions();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByTestId('genre')).toBeInTheDocument();
  });

  test('should not render rating component when vote_average is zero', () => {
    mockBuildGenreText.mockReturnValueOnce(genres[0].name);
    const updatedMovie = { ...movie, vote_average: 0 };
    render(<MovieCard movie={updatedMovie} genres={genres} />);
    runCommonAssertions();
    expect(screen.queryByTestId('rating')).toBeNull();
    expect(screen.getByTestId('genre')).toBeInTheDocument();
  });

  test('should not render genre component ', () => {
    mockBuildGenreText.mockReturnValueOnce('');
    render(<MovieCard movie={movie} genres={genres} />);
    runCommonAssertions();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.queryByTestId('genre')).toBeNull();
  });
});
