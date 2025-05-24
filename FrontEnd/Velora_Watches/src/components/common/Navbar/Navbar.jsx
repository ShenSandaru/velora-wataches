import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Context/UserContext';
import { useWishlist } from '../../../Context/WishlistContext';
import './Navbar.css';
import './wishlist-styles.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart items from localStorage and calculate count
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCartItems = localStorage.getItem('cartItems');
        const cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
        setCartItemsCount(cartItems.length);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        setCartItemsCount(0);
      }
    };

    // Update count when component mounts
    updateCartCount();

    // Listen for storage changes (when cart is updated from another tab/window)
    window.addEventListener('storage', updateCartCount);

    // Clean up listener
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent background scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // Handle cart click - redirect to login if not logged in
  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      closeMenu();
      navigate('/login', { 
        state: { 
          message: 'Please log in to view your shopping cart',
          returnPath: '/cart'
        } 
      });
    } else {
      closeMenu();
    }
  };

  // Check if current path matches link path
  const isActive = (path) => {
    // Exact match for home, starts-with for other routes
    if (path === "/") {
      return location.pathname === path ? "active" : "";
    }
    return location.pathname.startsWith(path) ? "active" : "";
  };

  // Extract first name from full name
  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Velora Watches Logo" />
          </Link>
        </div>
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu} className={isActive("/")}>Home</Link></li>
          <li><Link to="/collections" onClick={closeMenu} className={isActive("/collections")}>Collections</Link></li>
          <li><Link to="/products" onClick={closeMenu} className={isActive("/products")}>All Watches</Link></li>
          <li className="wishlist-menu-item">
            <Link to="/wishlist" onClick={closeMenu} className={`wishlist-icon-link ${isActive("/wishlist")}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistItems.length > 0 && <span className="wishlist-count">{wishlistItems.length}</span>}
            </Link>
          </li>
          <li className="cart-menu-item">
            <Link to="/cart" onClick={handleCartClick} className={`cart-icon-link ${isActive("/cart")}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
            </Link>
          </li>
          
          {/* Conditional rendering based on authentication state */}
          {user ? (
            <li className="user-menu">
              <Link to="/dashboard" onClick={closeMenu} className={`welcome-user ${isActive("/dashboard")}`}>
                {firstName}'s Dashboard
              </Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : (
            <li className="auth-links">
              <Link to="/login" onClick={closeMenu} className={`login-link ${isActive("/login")}`}>Login</Link>
              <Link to="/signup" onClick={closeMenu} className={`signup-link ${isActive("/signup")}`}>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;