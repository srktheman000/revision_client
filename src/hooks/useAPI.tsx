import { useState, useCallback } from "react";

interface UseAPIState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

function useAPI<T>(
  apiFunction: (...args: unknown[]) => Promise<T>
): [UseAPIState<T>, (...args: unknown[]) => Promise<void>] {
  const [state, setState] = useState<UseAPIState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const callAPI = useCallback(
    async (...args: unknown[]) => {
      setState({ loading: true, error: null, data: null });
      try {
        const result = await apiFunction(...args);
        setState({ loading: false, error: null, data: result });
      } catch (err: any) {
        setState({
          loading: false,
          error: err.message || "An error occurred",
          data: null,
        });
      }
    },
    [apiFunction]
  );

  return [state, callAPI];
}

export default useAPI;
