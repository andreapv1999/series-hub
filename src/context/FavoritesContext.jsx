
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import FavoritesContext from './FavoritesContextValue';

const STORAGE_KEY = 'series-hub-favorites';

const getStoredFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(storedFavorites);

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
};

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('No se pudieron guardar los favoritos:', error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((show) => {
    if (!show?.id) {
      return;
    }

    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === show.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== show.id
        );
      }

      return [...currentFavorites, show];
    });
  }, []);

  const isFavorite = useCallback((showId) => {
    return favorites.some((favorite) => favorite.id === showId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [favorites, toggleFavorite, isFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
