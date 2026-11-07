
import { Search, X } from 'lucide-react';

const SearchBar = ({ query, onQueryChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    onQueryChange('');
  };

  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={handleSubmit}
    >
      <Search className="search-icon" size={21} aria-hidden="true" />

      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Busca tus series favoritas..."
        aria-label="Buscar series por nombre"
      />

      {query && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Borrar búsqueda"
        >
          <X size={19} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
