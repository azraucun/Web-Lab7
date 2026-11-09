import { Link, useNavigate, useParams } from 'react-router';
import { fetchProduct } from '../api/productsApi.js';
import { useFetch } from '../hooks/useFetch.js';
import { useCartStore } from '../store/cartStore.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const productId = Number(id);

  let content;

  if (loading) {
    content = <p>Loading product...</p>;
  } else if (error) {
    content =
      error.status === 404 ? (
        <div className="empty-state">
          <h2>Product not found</h2>
          <p>There is no product with id "{id}".</p>
        </div>
      ) : (
        <p>Could not load the product: {error.message}</p>
      );
  } else {
    content = (
      <article className="product-detail">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-detail-image"
        />

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>

          <button className="add-to-cart" onClick={() => addItem(product)}>
            Add to cart
          </button>

          <div className="product-nav">
            {productId > 1 && (
              <Link to={`/products/${productId - 1}`}>← Previous product</Link>
            )}
            <Link to={`/products/${productId + 1}`}>Next product →</Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <section>
      <button className="back-button" onClick={() => navigate('/products')}>
        ← Back to products
      </button>
      {content}
    </section>
  );
}

export default ProductDetail;