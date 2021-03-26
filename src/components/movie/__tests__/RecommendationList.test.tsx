import React from 'react';
import { render, screen } from '@testing-library/react';
import { movie, genres } from 'fixtures';
import RecommendationList from 'components/movie/RecommendationList';

describe('RecommendationList', () => {
  test('should render component', () => {
    render(<RecommendationList movies={[movie]} genres={genres} />);
    expect(screen.getByText('Recommendations')).toBeInTheDocument();
    expect(screen.getByTestId('movie-list').childElementCount).toEqual(1);
  });
});
