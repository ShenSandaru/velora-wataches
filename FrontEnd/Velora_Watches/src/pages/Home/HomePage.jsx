import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import WatchCards from './WatchCards/WatchCards';
import './HomePage.css';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Velora Watches</h1>
            <p>Discover our collection of premium timepieces</p>
            <Link to="/products">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>
        </section>

        {/* Featured Watches Section with Flip Cards */}
        <WatchCards />

        {/* Special Offer Section */}
        <section className="special-offer">
          <img 
            src="https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/Black%20Elegant%20Watch%20Special%20Offer%20Instagram%20Post-2%5B1%5D.jpg" 
            alt="Special Offer" 
            className="offer-image"
          />
          <div className="offer-content">
            <h2>Special Offer</h2>
            <p>Get 30% off on premium watches</p>
            <Link to="/products">
              <button className="offer-btn">Shop Now</button>
            </Link>
          </div>
        </section>

        {/* Collection Showcase Section */}
        <section className="collection-showcase">
          <h2>Our Collections</h2>
          <div className="collection-grid">
            {[
              {
                image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch5.png",
                title: "Luxury Collection",
                link: "/collections?category=luxury"
              },
              {
                image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch6.png",
                title: "Sport Collection",
                link: "/collections?category=sport"
              },
              {
                image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch7.png",
                title: "Classic Collection",
                link: "/collections?category=classic"
              }
            ].map((collection, index) => (
              <Link to={collection.link} key={index} className="collection-item">
                <img src={collection.image} alt={collection.title} />
                <h3>{collection.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;