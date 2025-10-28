import { useState, useEffect, useCallback, useRef } from 'react';

interface ApiResponse<T> {
  timestamp: string;
  original_data?: any;
  llm_response: T;
  processing_time_seconds?: number;
  success: boolean;
  error: string | null;
  processed_count?: number;
  failed_count?: number;
}

interface PollingState<T> {
  data: T | null;
  isLoading: boolean;
  isConnected: boolean;
  error: Error | null;
  lastUpdate: Date | null;
}

interface UseDataPollingOptions {
  interval?: number; // milliseconds, default 7000
  enabled?: boolean; // whether polling is enabled, default true
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useDataPolling<T>(
  url: string,
  options: UseDataPollingOptions = {}
): PollingState<T> {
  const {
    interval = 7000,
    enabled = true,
    onSuccess,
    onError
  } = options;

  const [state, setState] = useState<PollingState<T>>({
    data: null,
    isLoading: false,
    isConnected: false,
    error: null,
    lastUpdate: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!url || !enabled) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse<T> = await response.json();

      if (!apiResponse.success || apiResponse.error) {
        throw new Error(apiResponse.error || 'API returned error');
      }

      // Extract llm_response from the nested structure
      const data = apiResponse.llm_response;

      if (isMountedRef.current) {
        setState({
          data,
          isLoading: false,
          isConnected: true,
          error: null,
          lastUpdate: new Date(),
        });

        onSuccess?.(data);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      
      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isConnected: false,
          error,
        }));

        onError?.(error);
      }

      console.error('Polling error:', error);
    }
  }, [url, enabled, onSuccess, onError]);

  // Initial fetch
  useEffect(() => {
    if (!url || !enabled) {
      setState({
        data: null,
        isLoading: false,
        isConnected: false,
        error: null,
        lastUpdate: null,
      });
      return;
    }

    // Fetch immediately on mount
    fetchData();

    // Set up polling interval
    intervalRef.current = setInterval(fetchData, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [url, enabled, interval, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return state;
}
