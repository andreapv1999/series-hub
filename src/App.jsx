
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import ShowDetails from './pages/ShowDetails';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} SERIES HUB. Descubre tu próxima historia.</p>
      </footer>
    </>
  );
};

export default App;
