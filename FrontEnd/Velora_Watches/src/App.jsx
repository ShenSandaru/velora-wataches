import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import HomePage from './pages/Home/HomePage';
import ProductsPage from './pages/Products/ProductsPage';
import CartPage from './pages/Cart/CartPage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProductDetailPage from './pages/prouductdetail/productDetailPage';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;