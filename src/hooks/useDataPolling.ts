import { useState, useEffect, useCallback } from 'react';

interface PollingOptions {
  interval?: number;
  enabled?: boolean;
}

interface PollingState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  lastUpdate: Date | null;
}

export function useDataPolling<T>(
  fetchFn: () => Promise<T>,
  options: PollingOptions = {}
) {
  const { interval = 7000, enabled = true } = options;
  
  const [state, setState] = useState<PollingState<T>>({
    data: null,
    loading: true,
    error: null,
    lastUpdate: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await fetchFn();
      setState({
        data: result,
        loading: false,
        error: null,
        lastUpdate: new Date(),
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err : new Error('Unknown error'),
      }));
    }
  }, [fetchFn]);

  useEffect(() => {
    if (!enabled) return;

    // Fetch immediately on mount
    fetchData();

    // Set up polling interval
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchData, interval, enabled]);

  return state;
}
