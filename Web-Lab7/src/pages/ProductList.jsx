import { fetchProducts } from '../api/productsApi.js';
import { useFetch } from '../hooks/useFetch.js';
import ProductCard from '../components/ProductCard.jsx';

function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Could not load products: {error.message}</p>;

  return (
    <>
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;s