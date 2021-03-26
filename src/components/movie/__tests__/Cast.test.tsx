import React from 'react';
import { render, screen } from '@testing-library/react';
import Cast from 'components/movie/Cast';
import { personnels } from 'fixtures';
import userEvent from '@testing-library/user-event';

describe('Cast', () => {
  beforeEach(() => {
    render(<Cast actors={personnels} />);
  });
  test('should render heading', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual('Actors');
  });

  test('should render subset of actors when switcher is unchecked', () => {
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    const actorListWrapper = screen.getByTestId('actor-list');
    expect(actorListWrapper).toBeInTheDocument();
    expect(actorListWrapper.childElementCount).toEqual(6);
  });

  test('should render all actors when switcher is checked', () => {
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    userEvent.click(input);
    expect(input).toBeChecked();
    const actorListWrapper = screen.getByTestId('actor-list');
    expect(actorListWrapper).toBeInTheDocument();
    expect(actorListWrapper.childElementCount).toEqual(personnels.length);
  });
});
