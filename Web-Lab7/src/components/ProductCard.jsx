import { Link } from 'react-router';
import { useCartStore } from '../store/cartStore.js';

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumb"
        />
        <h3>{product.title}</h3>
      </Link>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart" onClick={() => addItem(product)}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;