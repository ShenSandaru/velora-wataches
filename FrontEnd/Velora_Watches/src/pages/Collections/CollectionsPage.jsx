import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { products } from '../../data/products';
import './CollectionsPage.css';

const CollectionsPage = () => {
  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <MainLayout>
      <div className="collections-page">
        <h1>Our Collections</h1>
        <div className="collections-grid">
          {categories.map((category) => {
            const categoryProducts = products.filter(p => p.category === category);
            const firstProduct = categoryProducts[0];
            
            return (
              <div key={category} className="collection-card">
                <img src={firstProduct.image} alt={category} />
                <div className="collection-info">
                  <h2>{category}</h2>
                  <p>{categoryProducts.length} Watches</p>
                  <a href={`/products?category=${category}`} className="view-collection">
                    View Collection
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionsPage;