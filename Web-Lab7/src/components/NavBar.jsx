import { NavLink } from 'react-router';

function getLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function NavBar() {
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
        <NavLink to="/login" className={getLinkClass}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
