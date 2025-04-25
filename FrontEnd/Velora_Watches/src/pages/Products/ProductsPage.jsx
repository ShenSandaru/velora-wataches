import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import SearchBar from '../../components/common/serchbar/SearchBar';
import './ProductsPage.css';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="products-page">
        <h1>Our Collections</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        {/* Category Filter Dropdown */}
        <div style={{ maxWidth: 400, margin: '0 auto 2rem auto', textAlign: 'left' }}>
          <label htmlFor="category-filter" style={{ marginRight: 8, fontWeight: 500 }}>Filter by Category:</label>
          <select
            id="category-filter"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;