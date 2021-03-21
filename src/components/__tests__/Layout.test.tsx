import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Layout from 'components/Layout';
import { PageProps } from 'types';

const createTestProps = (props: PageProps): PageProps => ({ ...props });
const node = <div data-testid="child" />;

jest.mock('components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('components/Footer', () => () => <div data-testid="footer" />);

describe('Layout', () => {
  let dom: RenderResult;
  beforeAll(() => {
    const props = createTestProps({ children: node });
    dom = render(<Layout {...props} />);
  });

  test('should render component', () => {
    expect(dom.getByTestId(/navbar/)).toBeInTheDocument();
    expect(dom.getByTestId(/container/)).toBeInTheDocument();
    expect(dom.getByTestId(/main/)).toBeInTheDocument();
    expect(dom.getByTestId(/child/)).toBeInTheDocument();
    expect(dom.getByTestId(/footer/)).toBeInTheDocument();
  });
});
