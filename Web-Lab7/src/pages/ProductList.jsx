import { useSearchParams } from 'react-router';
import { fetchProducts } from '../api/productsApi.js';
import { useFetch } from '../hooks/useFetch.js';
import ProductCard from '../components/ProductCard.jsx';

function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';

  function updateParam(key, value, options) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === '' || value === 'all') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    }, options);
  }

  function clearFilters() {
    setSearchParams({});
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Could not load products: {error.message}</p>;

  // Derived values: computed during render, never stored in state
  const categories = [...new Set(products.map((p) => p.category))].sort();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <h1>Products</h1>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => updateParam('q', e.target.value, { replace: true })}
        />

        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <span className="result-count">
          Showing {filteredProducts.length} of {products.length}
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products match your filters.</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;