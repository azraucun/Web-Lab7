import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { useCartStore, selectItemCount } from '../store/cartStore.js';

function getLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function NavBar({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const itemCount = useCartStore(selectItemCount);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={getLinkClass}>
          Products
        </NavLink>
        <NavLink to="/cart" className={getLinkClass}>
          Cart <span className="cart-badge">{itemCount}</span>
        </NavLink>
      </div>

      <div className="nav-actions">
        <button className="nav-button" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <>
            <span className="nav-user">{user.username}</span>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className={getLinkClass}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;