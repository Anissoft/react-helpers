import { cleanup } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useDebounced from './useDebounced';

describe('hook useDebounced', () => {
  afterEach(cleanup);

  test('should return initial value', () => {
    const { result } = renderHook(() => useDebounced(0, 100));
    expect(result.current[0]).toBe(0);
  });

  test('should update value after delay', (finish) => {
    const { result } = renderHook(() => useDebounced(0, 100));
    expect(result.current[0]).toBe(0);
    result.current[1](v => v + 1);
    expect(result.current[0]).toBe(0);
    setTimeout(
      () => {
        expect(result.current[0]).toBe(1);
        finish();
      },
      200,
    );
  });

  test('should not update value meanwile delays', (finish) => {
    const { result } = renderHook(() => useDebounced(0, 100));
    expect(result.current[0]).toBe(0);
    const interval = setInterval(() => {
      result.current[1](v => v + 1);
    }, 10);
    setTimeout(
      () => {
        expect(result.current[0]).toBe(0);
        clearInterval(interval);
        finish();
      },
      200,
    );
  });
});
