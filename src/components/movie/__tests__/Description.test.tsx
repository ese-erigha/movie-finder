import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from 'components/movie/Description';
import { movie } from 'fixtures';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { Movie } from 'types';

describe('description', () => {
  const runCommonAssertions = (movieData: Movie) => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `${MOVIE_DB_IMAGE_URL.medium}${movieData.poster_path}`);
    expect(img).toHaveAttribute('alt', `${movieData.title}`);
    expect(screen.getByText(new RegExp(`${movieData.title}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${movieData.vote_average}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${movieData.overview}`))).toBeInTheDocument();
    expect(screen.getByText(/Release date/)).toBeInTheDocument();
    expect(screen.getByText(/Duration/)).toBeInTheDocument();
    expect(screen.getByText(/Budget/)).toBeInTheDocument();
  };
  test('should render components with all movie attributes', () => {
    render(<Description {...movie} />);
    runCommonAssertions(movie);
    expect(screen.getByText(/Genres/)).toBeInTheDocument();
    movie.genres.forEach(({ name }) =>
      expect(screen.getByText(new RegExp(`${name}`))).toBeInTheDocument(),
    );
    expect(screen.getByText(new RegExp(`${movie.tagline}`))).toBeInTheDocument();
  });

  test('should not render optional components when unavailable', () => {
    const partialMovie = { ...movie, tagline: undefined, genres: [] };
    render(<Description {...partialMovie} />);
    runCommonAssertions(partialMovie);
    expect(screen.queryByText(/Genres/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('genre-list')).not.toBeInTheDocument();
  });
});
