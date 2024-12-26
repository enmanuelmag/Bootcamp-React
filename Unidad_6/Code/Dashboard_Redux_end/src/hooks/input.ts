import React from 'react';

export const useDebounce = <T>(
  initialValue: T,
  delay: number
): readonly [T, T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
  const [debouncing, setDebouncing] = React.useState(false);

  const [value, setValue] = React.useState<T>(initialValue);

  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncing(false);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  function setValueState(value: React.SetStateAction<T>) {
    setDebouncing(true);
    setValue(value);
  }

  return [value, debouncedValue, setValueState, debouncing] as const;
};
