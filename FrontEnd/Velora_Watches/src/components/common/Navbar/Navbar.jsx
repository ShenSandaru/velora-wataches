import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../../Context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();

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
          <li><Link to="/cart" onClick={closeMenu} className={isActive("/cart")}>Cart</Link></li>
          
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