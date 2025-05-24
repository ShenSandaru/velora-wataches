import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import WatchCards from './WatchCards/WatchCards';
import NewsletterService from './NewsletterService/NewsletterService';
import RotatingOffers from './Rotating offerces/RotatingOffers';
import ExclusiveDeal from './ExclusiveDeal/ExclusiveDeal';
import { homeData } from '../../data/homeData';
import './HomePage.css';
import ReviewSection from './ReviewSection/ReviewSection';

const HomePage = () => {
  // Destructure data from our homeData file
  const { reviews, collections, features, specialOffer } = homeData;

  return (
    <MainLayout>
      <div className="home-page">
        {/* Modified Hero Section with RotatingOffers */}
        <section className="hero-combined-section">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to Velora Watches</h1>
              <p className="hero-subtitle">Discover our collection of premium timepieces crafted with precision and elegance</p>
              <Link to="/products">
                <button className="hero-btn">Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="hero-rotating-offers">
            <RotatingOffers />
          </div>
        </section>

        {/* Featured Watches Section */}
        <WatchCards />

        {/* Special Offer Section */}
        <ExclusiveDeal specialOffer={specialOffer} />

        {/* Collection Showcase Section */}
        <section className="collection-showcase">
          <h2>Our Collections</h2>
          <div className="collection-grid">
            {collections.map((collection, index) => (
              <Link to={collection.link} key={index} className="collection-item">
                <img src={collection.image} alt={collection.title} />
                <h3>{collection.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewSection reviews={reviews} />

  {/* Features Section */}
<div className="features-row-horizontal">
  {features.map((feature, index) => {
    const images = {
      Shipping: "https://cdn-icons-png.flaticon.com/512/7245/7245083.png",
      Genuine: "https://png.pngtree.com/png-clipart/20230804/original/pngtree-authentic-red-sticker-icon-vector-isolated-vector-picture-image_9625014.png",
      Accredited: "https://img.freepik.com/premium-vector/green-certified-isolated-rubber-stamp-sticker-seal-with-stars-tick-icon-vector-illustration_723710-1553.jpg",
      "Trusted Seller": "https://static.vecteezy.com/system/resources/thumbnails/026/711/260/small/trusted-seller-label-best-seller-premium-member-badge-verified-seller-rubber-stamp-shield-illustration-3d-realistic-glossy-and-shiny-badge-vector.jpg",
    };
    return (
      <div className="feature-card-horizontal" key={index}>
        <img
          src={images[feature.title]}
          alt={feature.title}
          className="feature-icon-horizontal"
        />
        <div className="feature-text-horizontal">
          <div className="feature-title-horizontal">{feature.title}</div>
          <div className="feature-desc-horizontal">{feature.description}</div>
        </div>
      </div>
    );
  })}
</div>
        {/* Newsletter Section */}
        <NewsletterService />
      </div>
    </MainLayout>
  );
};

export default HomePage;