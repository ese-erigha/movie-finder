import { renderHook } from '@testing-library/react-hooks';
import useHttpErrorHandler from 'hooks/useHttpErrorHandler';
import axiosInstance from 'api/axios';
import nock from 'nock';
import { act } from '@testing-library/react';
import { axiosError } from 'fixtures';

describe('useHttpErrorHandler', () => {
  test('should render initial value', () => {
    const { result } = renderHook(() => useHttpErrorHandler(axiosInstance));
    expect(result.current.error).toBeNull();
  });

  test('should render error message on http request failure', async () => {
    const { result } = renderHook(() => useHttpErrorHandler(axiosInstance));
    expect(result.current.error).toBeNull();

    // Trigger error response from http
    const scope = nock('http://api.myapihost.com')
      .get('/test')
      .query(true)
      .replyWithError(axiosError);

    await act(async () => {
      await axiosInstance.get('http://api.myapihost.com/test');
    });
    scope.done();
    expect(result.current.error?.message).toBe(axiosError.message);

    // Clear the error
    act(() => result.current.clearErrorHandler());
    expect(result.current.error).toBeNull();
  });
});
