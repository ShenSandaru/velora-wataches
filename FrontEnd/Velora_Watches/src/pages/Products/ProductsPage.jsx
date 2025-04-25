import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  return (
    <MainLayout>
      <div className="products-page">
        <h1>Our Collections</h1>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;