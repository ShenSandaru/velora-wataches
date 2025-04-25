import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import './CartPage.css';

const CartPage = () => {
  return (
    <MainLayout>
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {/* Cart items will go here */}
      </div>
    </MainLayout>
  );
};

export default CartPage;