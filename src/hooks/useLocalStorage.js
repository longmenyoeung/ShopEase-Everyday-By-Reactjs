import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved !== null && isValid(saved) ? saved : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* The store remains usable when browser storage is unavailable. */
    }
  }, [key, value]);

  return [value, setValue];
}
