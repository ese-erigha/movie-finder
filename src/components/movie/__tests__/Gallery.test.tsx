import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from 'components/movie/Gallery';
import { images } from 'fixtures';

describe('Gallery', () => {
  test('should render component', () => {
    render(<Gallery images={images} />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    const sliderImages = screen.getAllByRole('img');
    expect(sliderImages.length).toEqual(4); // 2 on the main slider, 2 at the bottom
  });
});
