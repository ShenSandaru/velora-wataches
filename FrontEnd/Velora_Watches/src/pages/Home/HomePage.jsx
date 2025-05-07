import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import WatchCards from './WatchCards/WatchCards';
import './HomePage.css';

const HomePage = () => {
  const reviews = [
    {
      name: 'Nabeel Safwan',
      time: '8 months ago',
      stars: '★★★★★',
      content: 'Very good service and affordable prices.',
    },
    {
      name: 'Aruna Jayasinghe',
      time: 'a year ago',
      stars: '★★★★★',
      content:
        'I have been looking for quality value for money watches and found Velora the perfect place. Service was excellent and support was great.',
    },
    {
      name: 'Kirushan Gokularatna',
      time: 'a year ago',
      stars: '★★★★★',
      content:
        'Bought a premium watch from them, gotta say they got some authentic and legit stuff. Looking to purchase more products from them!',
    },
    {
      name: 'Shavingya Vihanga',
      time: 'a year ago',
      stars: '★★★★★',
      content:
        'Highly Recommended. Bought and Paid online, very reliable. The only place which has premium watches for reasonable prices.',
    },
  ];

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

        {/* Featured Watches Section */}
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
            <p>Get 50% off on premium watches</p>
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
                image:
                  'https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch5.png',
                title: 'Luxury Collection',
                link: '/collections?category=luxury',
              },
              {
                image:
                  'https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch6.png',
                title: 'Sport Collection',
                link: '/collections?category=sport',
              },
              {
                image:
                  'https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch7.png',
                title: 'Classic Collection',
                link: '/collections?category=classic',
              },
            ].map((collection, index) => (
              <Link to={collection.link} key={index} className="collection-item">
                <img src={collection.image} alt={collection.title} />
                <h3>{collection.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews & Features Section */}
        <section className="reviews-section">
          <div className="reviews-header">
            <div>
              <h2 className="reviews-title">Velora Watches</h2>
              <div className="reviews-rating">
                <span className="stars">★★★★★</span>
                <span>4.8</span>
              </div>
              <div className="google-powered">powered by Google</div>
              <a href="#" className="review-us">
                Review us on 😊
              </a>
            </div>
          </div>

          <div className="reviews-container">
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div className="review-card" key={`review-${index}`}>
                  <div className="reviewer-info">
                  <img 
      src={review.profilePhoto} 
      alt={`${review.name}'s profile`} 
      className="reviewer-photo" 
    />
    <div className="reviewer-details">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="review-time">{review.time}</span>
                  </div>
                  </div>
                  {review.stars && <div className="review-stars">{review.stars}</div>}
                  <p className="review-content">{review.content}</p>
                </div>
              ))}

              {/* Duplicate reviews for continuous scroll effect */}
              {reviews.map((review, index) => (
                <div className="review-card" key={`review-clone-${index}`}>
                  <div className="reviewer-info">    <img 
      src={review.profilePhoto} 
      alt={`${review.name}'s profile`} 
      className="reviewer-photo" 
    />
    <div className="reviewer-details">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="review-time">{review.time}</span>
                  </div>
                  </div>
                  {review.stars && <div className="review-stars">{review.stars}</div>}
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="features-grid">
            {[
              {
                title: 'Shipping',
                description: 'All Island Delivery',
              },
              {
                title: 'Genuine',
                description: 'Only Authentic Products',
              },
              {
                title: 'Accredited',
                description: 'TRCSL Approved Vendor',
              },
              {
                title: 'Trusted Seller',
                description: '99% Positive Feedbacks',
              },
            ].map((feature, index) => (
              <div className="feature-card" key={index}>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
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
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
