import React from 'react';
import { render } from '@testing-library/react';

import Footer from 'components/Footer';

describe('Footer', () => {
  test('renders the component', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
