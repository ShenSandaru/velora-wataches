import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../Context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

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
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/collections" onClick={closeMenu}>Collections</Link></li>
          <li><Link to="/products" onClick={closeMenu}>All Watches</Link></li>
          <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
          
          {/* Conditional rendering based on authentication state */}
          {user ? (
            <li className="user-menu">
              <span className="welcome-user">Hello, {firstName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : (
            <li className="auth-links">
              <Link to="/login" onClick={closeMenu} className="login-link">Login</Link>
              <Link to="/signup" onClick={closeMenu} className="signup-link">Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;