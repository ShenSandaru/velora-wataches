import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import CartPage from './pages/Cart/CartPage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProductDetailPage from './pages/prouductdetail/productDetailPage';
import DashboardPage  from './pages/Dashboard/DashboardPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path='/product/:productId' element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;