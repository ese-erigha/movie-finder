import React from 'react';
import { render, screen } from '@testing-library/react';
import BackDrop from 'components/movie/BackDrop';
import { movie } from 'fixtures';

describe('BackDrop', () => {
  test('should render component', () => {
    render(<BackDrop {...movie} />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });
});
