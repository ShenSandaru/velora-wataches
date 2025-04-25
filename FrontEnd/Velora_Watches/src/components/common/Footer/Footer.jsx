import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Velora</h3>
          <p>Luxury timepieces crafted with precision and elegance.</p>
          {/* Optional: Social icons row */}
          <div className="footer-social">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: <a href="mailto:info@velora.com">info@velora.com</a></li>
            <li>Phone: <a href="tel:1234567890">(123) 456-7890</a></li>
            <li>Address: 123 Watch Street</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Velora Watches. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;