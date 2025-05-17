import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useCart } from '../../Context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate cart total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return (
    <MainLayout>
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="cart-container">
            <div className="cart-items">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="cart-item">
                      <td className="item-info">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div>
                          <h3>{item.name}</h3>
                          <Link to={`/product/${item.id}`} className="view-product">View Product</Link>
                        </div>
                      </td>
                      <td className="item-price">${item.price.toFixed(2)}</td>
                      <td className="item-quantity">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="item-total">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="item-actions">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="remove-item"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-message">
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/products" className="shop-now-btn">Shop Now</Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;