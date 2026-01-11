import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/components/Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = useSelector(state =>
    state.cart.items.reduce((acc, item) => acc + item.qty, 0)
  );
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      closeMenu();
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <header className="a-header">
      <div className="a-header-inner">
        {/* Logo */}
        <Link to="/" className="a-logo" onClick={closeMenu}>
          shop<span>ify</span>
        </Link>

        <nav className={`a-nav ${isMenuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={location.pathname === "/products" ? "active" : ""}
            onClick={closeMenu}
          >
            Products
          </Link>

          <Link
            to="/women"
            className={location.pathname === "/women" ? "active" : ""}
            onClick={closeMenu}
          >
            Women
          </Link>

          <Link
            to="/men"
            className={location.pathname === "/men" ? "active" : ""}
            onClick={closeMenu}
          >
            Men
          </Link>

          <Link
            to="/other"
            className={location.pathname === "/other" ? "active" : ""}
            onClick={closeMenu}
          >
            Other
          </Link>

          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="a-search-container">
          <span className="a-search-icon">🔍</span>
          <input
            type="text"
            className="a-search-input"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Actions Group (Wishlist + Cart + Hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            to="/wishlist"
            className={`a-wishlist ${location.pathname === "/wishlist" ? "active" : ""}`}
            onClick={closeMenu}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            ❤️
            <span style={{ fontWeight: 700, fontSize: 13 }}>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="a-wishlist-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={`a-cart ${location.pathname === "/cart" ? "active" : ""}`}
            onClick={closeMenu}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            🛒
            <span style={{ fontWeight: 700, fontSize: 13 }}>Cart</span>
            {cartCount > 0 && (
              <span className="a-cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Hamburger Element */}
          <div
            className={`a-hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
