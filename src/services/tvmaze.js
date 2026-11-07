
const API_URL = 'https://api.tvmaze.com';

// Función común para realizar peticiones a la API
const fetchData = async (url, signal) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Error al consultar TVMaze: ${response.status}`
    );
  }

  return response.json();
};

// Obtener el catálogo de series
export const getShows = async (page = 0, signal) => {
  return fetchData(
    `${API_URL}/shows?page=${page}`,
    signal
  );
};

// Buscar series por nombre
export const searchShows = async (query, signal) => {
  const searchTerm = query.trim();

  if (!searchTerm) {
    return [];
  }

  const results = await fetchData(
    `${API_URL}/search/shows?q=${encodeURIComponent(searchTerm)}`,
    signal
  );

  return results.map((result) => result.show);
};

// Obtener los detalles de una serie y sus episodios
export const getShowById = async (id, signal) => {
  if (!id) {
    throw new Error('No se ha proporcionado un ID de serie válido');
  }

  return fetchData(
    `${API_URL}/shows/${id}?embed=episodes`,
    signal
  );
};
