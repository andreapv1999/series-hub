
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import useFavorites from '../context/useFavorites';

const ShowCard = ({ show }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!show) {
    return null;
  }

  const favorite = isFavorite(show.id);
  const imageUrl = show.image?.medium || show.image?.original;
  const rating = show.rating?.average;

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(show);
  };

  return (
    <article className="show-card">
      <div className="show-card-image">
        <Link
          to={`/show/${show.id}`}
          className="show-card-link"
          aria-label={`Ver detalles de ${show.name}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Póster de ${show.name}`}
              loading="lazy"
            />
          ) : (
            <div className="show-image-placeholder">
              <span>{show.name}</span>
            </div>
          )}
        </Link>

        <button
          type="button"
          className={`favorite-button${favorite ? ' is-favorite' : ''}`}
          onClick={handleFavorite}
          aria-label={
            favorite
              ? `Eliminar ${show.name} de favoritos`
              : `Añadir ${show.name} a favoritos`
          }
          aria-pressed={favorite}
        >
          <Heart
            size={20}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>

        {rating && (
          <span className="show-rating">
            <Star size={14} fill="currentColor" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="show-card-content">
        <Link to={`/show/${show.id}`} className="show-card-title">
          {show.name}
        </Link>

        <div className="show-card-meta">
          <span>{show.premiered?.slice(0, 4) || 'Año desconocido'}</span>

          {show.genres?.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{show.genres[0]}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ShowCard;
