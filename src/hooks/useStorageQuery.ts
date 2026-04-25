import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

type Selector<T> = () => Promise<T> | T;

const isValidSelector = <T>(selector: Selector<T>) => {
  const isValid = selector.name.startsWith("get");
  if (!isValid && import.meta.env.DEV) {
    console.warn(`Функция [${selector.name}] должна начинаться на get и не должен мутировать данные`);
  }
  return isValid;
};

export function useStorageQuery<T>(selector: () => Promise<T> | T, deps: Array<any> = []) {
  const [error, setError] = useState<Error | string | null>(null);

  const data = useLiveQuery(async () => {
    try {
      setError(null);
      isValidSelector(selector);
      return await selector();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw err;
    }
  }, deps);

  const isLoading = data === undefined && !error;
  const isError = !!error;
  const isSuccess = data !== undefined && !error;

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}
