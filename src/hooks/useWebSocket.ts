import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketState<T> {
  data: T | null;
  isConnected: boolean;
  error: Error | null;
  lastUpdate: Date | null;
}

interface UseWebSocketOptions {
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket<T>(
  url: string,
  options: UseWebSocketOptions = {}
) {
  const { reconnectInterval = 3000, maxReconnectAttempts = 10 } = options;
  
  const [state, setState] = useState<WebSocketState<T>>({
    data: null,
    isConnected: false,
    error: null,
    lastUpdate: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setState(prev => ({
          ...prev,
          isConnected: true,
          error: null,
        }));
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const jsonData = JSON.parse(event.data) as T;
          setState({
            data: jsonData,
            isConnected: true,
            error: null,
            lastUpdate: new Date(),
          });
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
          setState(prev => ({
            ...prev,
            error: new Error('Failed to parse message'),
          }));
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setState(prev => ({
          ...prev,
          error: new Error('WebSocket connection error'),
        }));
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setState(prev => ({
          ...prev,
          isConnected: false,
        }));

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1;
          console.log(
            `Reconnecting... (Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`
          );
          
          reconnectTimeoutRef.current = window.setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else {
          setState(prev => ({
            ...prev,
            error: new Error('Max reconnection attempts reached'),
          }));
        }
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err : new Error('Connection failed'),
      }));
    }
  }, [url, reconnectInterval, maxReconnectAttempts]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return state;
}
