import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import ProductCard from "../components/ProductCard";
import "../styles/pages/product-details.css";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === Number(id))
  );

  const similarProducts = useSelector((state) =>
    state.products.list
      .filter(
        (p) =>
          p.category === product?.category && p.id !== Number(id)
      )
      .slice(0, 5)
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null); // null, 'checking', 'available', 'unavailable'

  // Update selected image when product changes or loads
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image || product.thumbnail);
    }
  }, [product]);

  const handlePincodeCheck = () => {
    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }
    setPincodeStatus("checking");
    setTimeout(() => {
      // Mock logic: 50% chance/ or just always success
      setPincodeStatus("available");
    }, 1000);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size"); // Improvement: Use better UI feedback
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize }));
    alert("Added to Bag!"); // Improvement: Use Toast/Popup
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };


  if (!product) return <p className="pdp-container">Loading or Product Not Found...</p>;

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || product.thumbnail];

  // Calculate generic discount for visual appeal if not in API
  const discountPercentage = product.discountPercentage || Math.round(Math.random() * 30 + 10);
  const mrp = Math.round(product.price * (100 / (100 - discountPercentage)));

  return (
    <>
      <div className="pdp-container">
        {/* Left: Gallery */}
        <div className="pdp-gallery">
          {images.length > 1 && (
            <div className="pdp-thumbnails">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`pdp-thumb ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
          <div className="pdp-main-image">
            <img src={selectedImage} alt={product.title} />
          </div>
        </div>

        {/* Right: Info */}
        <div className="pdp-info">
          <h1 className="pdp-title">{product.brand || "Brand Name"}</h1>
          <h2 className="pdp-subtitle">{product.title}</h2>

          <div className="pdp-price-box">
            <span className="pdp-price">Rs {product.price}</span>
            <span className="pdp-mrp">Rs {mrp}</span>
            <span className="pdp-discount">({discountPercentage}% OFF)</span>
            <span className="pdp-tax-note">inclusive of all taxes</span>
          </div>

          <div className="pdp-size-section">
            <div className="pdp-section-title">
              SELECT SIZE
              <span className="size-chart-link">SIZE CHART</span>
            </div>
            <div className="size-buttons">
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-actions">
            <button className="btn-add-bag" onClick={handleAddToCart}>
              ADD TO BAG
            </button>
            <button className="btn-wishlist" onClick={handleWishlist}>
              WISHLIST
            </button>
          </div>

          <div className="pdp-delivery">
            <div className="pdp-section-title">DELIVERY OPTIONS</div>
            <div className="delivery-input-group">
              <input
                type="text"
                placeholder="Enter pincode"
                className="delivery-input"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
              />
              <button className="btn-check" onClick={handlePincodeCheck}>
                Check
              </button>
            </div>
            {pincodeStatus === "checking" && <p>Checking...</p>}
            {pincodeStatus === "available" && <p style={{ color: "green", marginTop: 5 }}>Delivery available!</p>}
          </div>

          <div className="pdp-description">
            <div className="pdp-section-title">PRODUCT DETAILS</div>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="grid"> {/* Recycling the grid class from product-list.css if global, else might need adjustment */}
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
