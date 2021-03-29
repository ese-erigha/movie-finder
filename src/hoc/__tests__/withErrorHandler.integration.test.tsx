import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { axiosInstance } from 'api/httpClient';
import nock from 'nock';
import WithErrorHandler from 'hoc/withErrorHandler';
import userEvent from '@testing-library/user-event';
import { axiosError } from 'fixtures';

describe('Integration test between useHttpErrorHandler hook and withErrorHandler HOC', () => {
  test('user should interact with modal', async () => {
    render(
      <WithErrorHandler>
        <div data-testid="child" />
      </WithErrorHandler>,
    );

    // Modal should be hidden by default
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
    expect(screen.queryByText(`${axiosError.message}`)).not.toBeInTheDocument();

    // Trigger http request failure with error message
    const scope = nock('http://api.myapihost.com')
      .get('/test')
      .query(true)
      .replyWithError(axiosError);

    await act(async () => {
      await axiosInstance.get('http://api.myapihost.com/test');
    });
    scope.done();

    // Modal should be present in DOM
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(`${axiosError.message}`)).toBeInTheDocument();

    // Close modal
    act(() => userEvent.click(screen.getByTestId('close-button')));

    // Modal should not be present in DOM
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
    expect(screen.queryByText(`${axiosError.message}`)).not.toBeInTheDocument();

    screen.debug();
  });
});
