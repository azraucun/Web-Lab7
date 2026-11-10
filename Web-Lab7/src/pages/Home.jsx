import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

const FEATURED_CATEGORIES = ['beauty', 'fragrances', 'furniture', 'groceries'];

function Home() {
  const { user } = useAuth();

  return (
    <section className="home">
      <h1>Welcome to the Online Shop</h1>

      <p>
        {user
          ? `Signed in as ${user.username}.`
          : 'Browse freely — sign in to see your cart.'}
      </p>

      <Link to="/products" className="home-cta">
        Browse all products
      </Link>

      <h2>Shop by category</h2>
      <ul className="home-categories">
        {FEATURED_CATEGORIES.map((category) => (
          <li key={category}>
            <Link to={`/products?category=${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;