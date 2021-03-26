import React from 'react';
import { render, screen } from '@testing-library/react';

import Actor from 'components/movie/Actor';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { personnel } from 'fixtures';

describe('Actor', () => {
  const runCommonAssertions = () => {
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('character')).toBeInTheDocument();
  };

  test('should render all component when all values are present', () => {
    render(<Actor {...personnel} />);
    runCommonAssertions();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `${MOVIE_DB_IMAGE_URL.small}${personnel.profile_path}`);
    expect(img).toHaveAttribute('alt', personnel.name);
  });

  test('should render component with no photo image when profile_path not available', () => {
    const newPersonnel = { ...personnel, profile_path: undefined };
    render(<Actor {...newPersonnel} />);
    runCommonAssertions();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/NO PHOTO/)).toBeInTheDocument();
  });
});
