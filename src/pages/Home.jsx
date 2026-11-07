
import { useMemo } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import useShows from '../hooks/useShows';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const {
    shows,
    loading,
    error,
    query,
    setQuery,
  } = useShows();

  const featuredShows = useMemo(() => {
    return [...shows]
      .sort(
        (a, b) =>
          (b.rating?.average || 0) - (a.rating?.average || 0)
      )
      .slice(0, 12);
  }, [shows]);

  return (
    <main className="page-container home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">
            <Sparkles size={16} />
            TU UNIVERSO DE SERIES
          </span>

          <h1>
            Encuentra tu próxima
            <span className="highlight-text"> obsesión.</span>
          </h1>

          <p>
            Descubre nuevas historias, explora grandes éxitos
            y guarda las series que no te quieres perder.
          </p>

          <SearchBar
            query={query}
            onQueryChange={setQuery}
          />
        </div>
      </section>

      <section className="shows-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              {query ? 'RESULTADOS' : 'SELECCIÓN ESPECIAL'}
            </span>

            <h2>
              {query ? `Buscando: ${query}` : 'Series destacadas'}
            </h2>
          </div>

          {!query && (
            <span className="section-label">
              <TrendingUp size={17} />
              Más valoradas
            </span>
          )}
        </div>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && featuredShows.length === 0 && (
          <div className="empty-state">
            <h3>No hemos encontrado series</h3>
            <p>Prueba con otro nombre para encontrar lo que buscas.</p>
          </div>
        )}

        {!loading && !error && featuredShows.length > 0 && (
          <div className="shows-grid">
            {featuredShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
