import { Outlet } from 'react-router';
import NavBar from './NavBar.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

function Layout() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Guard against unexpected stored values such as "blue"
  const activeTheme = theme === 'dark' ? 'dark' : 'light';

  function toggleTheme() {
    setTheme(activeTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={`app ${activeTheme}`}>
      <NavBar theme={activeTheme} onToggleTheme={toggleTheme} />

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