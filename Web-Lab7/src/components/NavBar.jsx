import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function getLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function NavBar() {
  const { user, logout } = useAuth();

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
          Cart
        </NavLink>
      </div>

      <div className="nav-actions">
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