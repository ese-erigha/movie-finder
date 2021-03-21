import React from 'react';
import { render } from '@testing-library/react';

import LoadingSpinner from 'components/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('should render spinner', () => {
    // see also
    //  https://stackoverflow.com/questions/53003594/find-element-by-id-in-react-testing-library
    // https://kasongoyo.medium.com/using-react-testing-library-to-test-if-component-contains-an-instance-of-another-component-c46a39c3611b
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId(/spinner/)).toBeInTheDocument();
  });
});
