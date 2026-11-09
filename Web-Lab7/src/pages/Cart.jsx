import { Link } from 'react-router';
import { useCartStore, selectTotalPrice } from '../store/cartStore.js';

function Cart() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>Your cart is empty</h1>
        <p>
          <Link to="/products">Browse products</Link> to add something.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <Link to={`/products/${item.id}`} className="cart-item-title">
              {item.title}
            </Link>

            <span>${item.price.toFixed(2)}</span>

            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <span className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={clear}>Clear cart</button>
      </div>
    </section>
  );
}

export default Cart;