
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Heart,
  PlayCircle,
  Star,
  Tv,
} from 'lucide-react';
import { getShowById } from '../services/tvmaze';
import useFavorites from '../context/useFavorites';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ShowDetails = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadShow = async () => {
      setLoading(true);
      setError('');
      setShow(null);

      try {
        const data = await getShowById(id, controller.signal);
        setShow(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se ha podido cargar la información de esta serie.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadShow();

    return () => {
      controller.abort();
    };
  }, [id, retryCount]);

  const handleRetry = () => {
    setRetryCount((current) => current + 1);
  };

  if (loading) {
    return (
      <main className="page-container">
        <Loading message="Cargando información de la serie..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <ErrorMessage message={error} onRetry={handleRetry} />
        <Link to="/explore" className="back-link">
          <ArrowLeft size={17} />
          Volver a explorar
        </Link>
      </main>
    );
  }

  if (!show) {
    return (
      <main className="page-container empty-state">
        <h2>Serie no encontrada</h2>
        <p>No hemos encontrado la serie que buscas.</p>
        <Link to="/explore" className="back-link">
          <ArrowLeft size={17} />
          Volver a explorar
        </Link>
      </main>
    );
  }

  const favorite = isFavorite(show.id);
  const imageUrl = show.image?.original || show.image?.medium;
  const episodes = show._embedded?.episodes || [];

  const summary = show.summary
    ? show.summary.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : 'No hay descripción disponible para esta serie.';

  return (
    <main className="page-container details-page">
      <Link to="/explore" className="back-link">
        <ArrowLeft size={17} />
        Volver a explorar
      </Link>

      <section className="details-hero">
        <div className="details-poster">
          {imageUrl ? (
            <img src={imageUrl} alt={`Póster de ${show.name}`} />
          ) : (
            <div className="show-image-placeholder">
              {show.name}
            </div>
          )}
        </div>

        <div className="details-content">
          <span className="hero-eyebrow">
            <Tv size={16} />
            FICHA DE LA SERIE
          </span>

          <h1>{show.name}</h1>

          {show.genres?.length > 0 && (
            <div className="genre-list">
              {show.genres.map((genre) => (
                <span className="genre-tag" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="details-summary">{summary}</p>

          <div className="details-metadata">
            {show.rating?.average && (
              <span>
                <Star size={17} />
                {show.rating.average.toFixed(1)} / 10
              </span>
            )}

            {show.premiered && (
              <span>
                <CalendarDays size={17} />
                {show.premiered.slice(0, 4)}
              </span>
            )}

            {show.runtime && (
              <span>
                <Clock size={17} />
                {show.runtime} min
              </span>
            )}
          </div>

          <p className="details-status">
            Estado: <strong>{show.status || 'No disponible'}</strong>
          </p>

          {show.network?.name && (
            <p className="details-network">
              Emisora: <strong>{show.network.name}</strong>
            </p>
          )}

          <button
            type="button"
            className={`details-favorite-button${favorite ? ' is-favorite' : ''}`}
            onClick={() => toggleFavorite(show)}
            aria-pressed={favorite}
          >
            <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
            {favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
          </button>

          {show.officialSite && (
            <a
              href={show.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="official-site-link"
            >
              Visitar web oficial
            </a>
          )}
        </div>
      </section>

      <section className="episodes-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">GUÍA DE EPISODIOS</span>
            <h2>Episodios</h2>
          </div>

          <span className="section-label">
            <PlayCircle size={17} />
            {episodes.length} episodios
          </span>
        </div>

        {episodes.length === 0 ? (
          <div className="empty-state">
            <p>No hay episodios disponibles para esta serie.</p>
          </div>
        ) : (
          <div className="episodes-list">
            {episodes.map((episode) => (
              <article className="episode-card" key={episode.id}>
                <div className="episode-number">
                  T{episode.season} · E{episode.number ?? '?'}
                </div>

                <div className="episode-information">
                  <h3>{episode.name || 'Episodio sin título'}</h3>
                  <p>
                    {episode.airdate || 'Fecha no disponible'}
                    {episode.runtime ? ` · ${episode.runtime} min` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ShowDetails;
