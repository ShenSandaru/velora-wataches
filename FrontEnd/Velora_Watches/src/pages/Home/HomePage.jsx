import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import './HomePage.css';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="home-page">
        <section className="hero-section">
          <h1>Welcome to Velora Watches</h1>
          <p>Discover our collection of premium timepieces</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;