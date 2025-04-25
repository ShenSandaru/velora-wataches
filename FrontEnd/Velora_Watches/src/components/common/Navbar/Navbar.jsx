import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Velora Watches Logo" />
          </Link>
        </div>
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Overlay for mobile menu */}
        {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/collections" onClick={closeMenu}>Collections</Link></li>
          <li><Link to="/products" onClick={closeMenu}>All Watches</Link></li>
          <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;