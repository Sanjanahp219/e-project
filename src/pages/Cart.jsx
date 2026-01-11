import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, decreaseQty } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "../styles/components/cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <h3>Looks like you haven't added anything yet.</h3>
        <Link to="/products" className="btn-primary" style={{ display: 'inline-block', maxWidth: '200px' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Shopping Cart ({items.length} items)</h2>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.images?.[0] || "/fallback.png"} alt={item.title} />
            </div>

            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <span className="cart-item-price">Rs {item.price}</span>
            </div>

            <div className="cart-item-actions">
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => dispatch(decreaseQty(item.id))}
                  disabled={item.qty <= 1}
                >-</button>
                <span>{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => dispatch(addToCart(item))}
                >+</button>
              </div>

              <button
                className="btn-remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: Rs {total.toFixed(2)}</h3>
        <button className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
}
