import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { getCleanImage } from "../utils/imageHelper";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  // Check if product is in wishlist
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };
  return (
    <div className="product-card" style={{ position: "relative" }}>
      {showPopup && (
        <div className="cart-popup">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </div>
      )}
      <div className="product-image-container">
        {/* Wishlist Heart Icon */}
        <button
          className={`wishlist-heart-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isInWishlist ? "#ec4899" : "none"}
            stroke={isInWishlist ? "#ec4899" : "#6b7280"}
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
        <img
          src={getCleanImage(product.images)}
          alt={product.title}
          onError={(e) => {
            e.target.src = "/fallback.png";
          }}
        />
      </div>
      <div className="product-info">
        <h4>{product.title}</h4>
        <p>Rs {product.price}</p>
        <p>{product.brand}</p>
        <p className="product-description">{product.description}</p>
        <button className="btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
