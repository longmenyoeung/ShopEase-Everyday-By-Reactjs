import { useEffect, useState } from 'react';
import { getCatalog } from '../services/api';

export function useCatalog() {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    getCatalog({ signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ data: null, loading: false, error: error.message });
      });
    return () => controller.abort();
  }, [attempt]);

  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
