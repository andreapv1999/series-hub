
import { Heart, Film, Trash2 } from 'lucide-react';
import ShowCard from '../components/ShowCard';
import useFavorites from '../context/useFavorites';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <main className="page-container favorites-page">
      <section className="page-hero">
        <span className="hero-eyebrow">
          <Heart size={16} />
          TU COLECCIÓN PERSONAL
        </span>

        <h1>Mis favoritas</h1>

        <p>
          Todas las series que has guardado en un mismo lugar.
        </p>
      </section>

      <section className="shows-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">TU LISTA</span>
            <h2>Series guardadas</h2>
          </div>

          {favorites.length > 0 && (
            <button
              type="button"
              className="clear-favorites-button"
              onClick={clearFavorites}
            >
              <Trash2 size={17} />
              Vaciar favoritos
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state favorites-empty">
            <Heart size={42} />
            <h3>Tu lista está vacía</h3>
            <p>
              Todavía no has guardado ninguna serie.
              Explora el catálogo y pulsa el corazón para añadir tus favoritas.
            </p>
          </div>
        ) : (
          <div className="shows-grid">
            {favorites.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <p className="favorites-summary">
            <Film size={16} />
            Tienes {favorites.length}{' '}
            {favorites.length === 1 ? 'serie guardada' : 'series guardadas'}.
          </p>
        )}
      </section>
    </main>
  );
};

export default Favorites;
