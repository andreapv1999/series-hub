
import { NavLink, Link } from 'react-router-dom';
import { Clapperboard, Heart, Home, Compass } from 'lucide-react';
import useFavorites from '../context/useFavorites';

const Header = () => {
  const { favorites } = useFavorites();

  const getNavClass = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link-active' : ''}`;

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand" aria-label="Series Hub - Inicio">
          <Clapperboard size={30} strokeWidth={2.2} />
          <span>SERIES<span className="brand-highlight">HUB</span></span>
        </Link>

        <nav className="main-navigation" aria-label="Navegación principal">
          <NavLink to="/" end className={getNavClass}>
            <Home size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink to="/explore" className={getNavClass}>
            <Compass size={18} />
            <span>Explorar</span>
          </NavLink>

          <NavLink to="/favorites" className={getNavClass}>
            <Heart size={18} />
            <span>Favoritos</span>
            <span className="favorites-count">{favorites.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
