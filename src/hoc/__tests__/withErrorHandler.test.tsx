import React from 'react';
import { render, screen } from '@testing-library/react';
import * as useHttpErrorHandler from 'hooks/useHttpErrorHandler';
import WithErrorHandler from 'hoc/withErrorHandler';

jest.mock('hooks/useHttpErrorHandler');

const mockUseHttpErrorHandler = useHttpErrorHandler as jest.Mocked<typeof useHttpErrorHandler>;

describe('withErrorHandler', () => {
  test('should render modal', () => {
    mockUseHttpErrorHandler.default.mockReturnValueOnce({
      error: { message: 'error-message', response: { status: 400 } },
      clearErrorHandler: () => console.log('clear'),
    });
    render(
      <WithErrorHandler>
        <div data-testid="child" />
      </WithErrorHandler>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('error-message')).toBeInTheDocument();
  });

  test('should not render modal when error message is null', () => {
    mockUseHttpErrorHandler.default.mockReturnValueOnce({
      error: null,
      clearErrorHandler: () => console.log('clear'),
    });
    render(
      <WithErrorHandler>
        <div data-testid="child" />
      </WithErrorHandler>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
    expect(screen.queryByText('error-message')).not.toBeInTheDocument();
  });
});
