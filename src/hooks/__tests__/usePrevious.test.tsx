import { renderHook } from '@testing-library/react-hooks';
import usePrevious from 'hooks/usePrevious';

describe('usePrevious', () => {
  test('should render with rerender', () => {
    const { result, rerender } = renderHook<string, string | undefined>(
      (value) => usePrevious(value),
      { initialProps: 'old' },
    );
    expect(result.current).toBeUndefined();
    rerender('new');
    expect(result.current).toEqual('old');
    rerender();
    expect(result.current).toEqual('new');
  });
});
