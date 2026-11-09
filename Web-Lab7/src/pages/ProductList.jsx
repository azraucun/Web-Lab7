import { fetchProducts } from '../api/productsApi.js';
import { useFetch } from '../hooks/useFetch.js';

function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Could not load products: {error.message}</p>;

  return (
    <>
      <h1>Products</h1>
      <p>{products.length} products loaded.</p>
    </>
  );
}

export default ProductList;