
import { useEffect, useState } from 'react';
import { getShows, searchShows } from '../services/tvmaze';

const useShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const data = query.trim()
          ? await searchShows(query, controller.signal)
          : await getShows(0, controller.signal);

        setShows(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            'No se han podido cargar las series. Inténtalo de nuevo.'
          );
          setShows([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, query.trim() ? 350 : 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return {
    shows,
    loading,
    error,
    query,
    setQuery,
  };
};

export default useShows;
