import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "../styles/pages/wishlist.css";

export default function Wishlist() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.wishlist.items);

    if (items.length === 0) {
        return (
            <div className="wishlist-page empty-wishlist">
                <div className="empty-wishlist-icon">❤️</div>
                <h2>Your Wishlist is Empty</h2>
                <p>Save items you love by clicking the heart icon on products.</p>
                <Link to="/products" className="btn-primary">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h2>My Wishlist ({items.length} items)</h2>
            </div>

            <div className="wishlist-grid">
                {items.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <button
                            className="wishlist-remove-btn"
                            onClick={() => dispatch(toggleWishlist(item))}
                            title="Remove from wishlist"
                        >
                            ✕
                        </button>

                        <Link to={`/products/${item.id}`} className="wishlist-item-image">
                            <img src={item.images?.[0] || item.thumbnail || "/fallback.png"} alt={item.title} />
                        </Link>

                        <div className="wishlist-item-details">
                            <Link to={`/products/${item.id}`} className="wishlist-item-title">
                                {item.title}
                            </Link>
                            <p className="wishlist-item-brand">{item.brand || "Brand"}</p>
                            <div className="wishlist-item-price">
                                <span className="price-current">Rs {item.price}</span>
                                {item.discountPercentage && (
                                    <span className="price-discount">{Math.round(item.discountPercentage)}% OFF</span>
                                )}
                            </div>
                        </div>

                        <button
                            className="wishlist-add-to-cart"
                            onClick={() => {
                                dispatch(addToCart(item));
                                dispatch(toggleWishlist(item));
                            }}
                        >
                            Move to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
