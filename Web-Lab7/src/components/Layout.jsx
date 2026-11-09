import { Outlet } from 'react-router';
import NavBar from './NavBar.jsx';

function Layout() {
  return (
    <div className="app">
      <NavBar />

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Online Shop — Web Programming Assignment 7</p>
      </footer>
    </div>
  );
}

export default Layout;