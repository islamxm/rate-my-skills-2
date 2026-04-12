import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<T extends (...args: any[]) => any>(handler: T) {
  const handlerRef = useRef(handler);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return useCallback((...args: Parameters<T>) => {
    return handlerRef.current(...args);
  }, []) as T;
}
