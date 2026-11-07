
import { useContext } from 'react';
import FavoritesContext from './FavoritesContextValue';

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error(
      'useFavorites debe utilizarse dentro de FavoritesProvider'
    );
  }

  return context;
};

export default useFavorites;
