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
        <div className="features-grid">
          {features.map((feature, index) => {
            const images = {
              Shipping: "https://img.freepik.com/premium-vector/cargo-ship-with-containers-line-icon_116137-4527.jpg",
              Genuine: "https://t3.ftcdn.net/jpg/07/02/37/36/360_F_702373647_GcgyxgpEYDhb77YUAsPpslgYu8BmmdGa.jpg",
              Accredited: "https://img.freepik.com/premium-vector/approval-icon-document-accredited-authorized-agreement-thin-line-symbol-web-mobile-phone-white-backgroundweb_530108-740.jpg",
              "Trusted Seller": "https://media.gettyimages.com/id/1743988735/vector/trusted-seller-badge-vector-illustration-modern-label-design.jpg?s=1024x1024&w=gi&k=20&c=xCIH5Evz7TRQcynZu4Rr9we8U8xXJS9ejI5y4BTihXE=",
            };
            return (
              <div className="feature-card" key={index}>
                <div className="feature-title-row">
                  <img
                    src={images[feature.title]}
                    alt={feature.title}
                    className="feature-icon"
                  />
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-desc">{feature.description}</p>
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