
import { Compass, Film } from 'lucide-react';
import useShows from '../hooks/useShows';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Explore = () => {
  const {
    shows,
    loading,
    error,
    query,
    setQuery,
  } = useShows();

  return (
    <main className="page-container explore-page">
      <section className="page-hero">
        <span className="hero-eyebrow">
          <Compass size={16} />
          EXPLORA EL UNIVERSO
        </span>

        <h1>Descubre nuevas series</h1>

        <p>
          Explora historias de todos los géneros y encuentra
          tu próxima serie favorita.
        </p>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
        />
      </section>

      <section className="shows-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">CATÁLOGO</span>
            <h2>{query ? 'Resultados de búsqueda' : 'Todas las series'}</h2>
          </div>

          {!loading && !error && (
            <span className="section-label">
              <Film size={17} />
              {shows.length} series
            </span>
          )}
        </div>

        {loading && <Loading message="Explorando series..." />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && shows.length === 0 && (
          <div className="empty-state">
            <h3>No hay resultados</h3>
            <p>
              No hemos encontrado ninguna serie.
              Prueba con otra búsqueda.
            </p>
          </div>
        )}

        {!loading && !error && shows.length > 0 && (
          <div className="shows-grid">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Explore;
