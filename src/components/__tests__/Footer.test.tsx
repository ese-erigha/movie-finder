import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Footer from 'components/Footer';

describe('Footer', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Footer />);
  });
  test('renders the component', () => {
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  test('should contain github account', () => {
    expect(screen.getByText('eseerigha')).toBeInTheDocument();
  });
  test('should render tmdb section', () => {
    expect(screen.getByTestId('tmdb-logo')).toBeInTheDocument();
    expect(screen.getByTestId('tmdb-link')).toBeInTheDocument();
  });
  test('should contain footer text', () => {
    expect(screen.getByText(/2021 made with/)).toBeInTheDocument();
  });
});
