import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useCart } from '../../Context/CartContext';
import { createOrder } from '../../services/orderService';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, singleCheckoutItem, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    cardType: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Initialize checkout items based on cart or direct buy item
  useEffect(() => {
    // Check for singleCheckoutItem first in localStorage (for page refresh scenarios)
    const storedSingleItem = localStorage.getItem('singleCheckoutItem');
    
    if (storedSingleItem) {
      try {
        const parsedItem = JSON.parse(storedSingleItem);
        setCheckoutItems([parsedItem]);
        console.log('Using stored single checkout item:', parsedItem);
      } catch (error) {
        console.error('Error parsing stored single checkout item:', error);
        setCheckoutItems([]);
      }
    } else if (singleCheckoutItem) {
      // If there's a singleCheckoutItem in context, use it
      setCheckoutItems([singleCheckoutItem]);
      console.log('Using context single checkout item:', singleCheckoutItem);
    } else {
      // Otherwise use the cart items
      setCheckoutItems(cartItems);
      console.log('Using cart items:', cartItems);
    }
  }, [cartItems, singleCheckoutItem]);

  // Calculate order total
  const subtotal = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Remove non-digits
      const digits = value.replace(/\D/g, '');
      
      // Format card number with spaces every 4 digits
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      
      // Detect card type based on first digit
      let cardType = '';
      if (/^4/.test(digits)) {
        cardType = 'visa';
      } else if (/^5[1-5]/.test(digits)) {
        cardType = 'mastercard';
      } else if (/^3[47]/.test(digits)) {
        cardType = 'amex';
      } else if (/^6(?:011|5)/.test(digits)) {
        cardType = 'discover';
      }
      
      setFormData({ 
        ...formData, 
        cardNumber: formatted.slice(0, 19), // Limit to 16 digits + 3 spaces
        cardType
      });
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const digits = value.replace(/\D/g, '');
      let formatted = digits;
      if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      }
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'cvv') {
      // Allow only digits and max 4 digits
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    // Payment validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY';
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsProcessing(true);
    
    try {
      // Format order data for backend
      const orderData = {
        items: checkoutItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        payment: {
          amount: total,
          cardType: formData.cardType,
          lastFour: formData.cardNumber.slice(-4),
          // Don't send full card details to the backend in a real app
        },
      };
      
      // For demonstration purposes, we're using client-side simulation
      // This will work without needing the backend to be running
      
      // Simulate API latency
      setTimeout(() => {
        console.log('Order submitted successfully:', orderData);
        setIsProcessing(false);
        setOrderSuccess(true);
        clearCart(); // Clear the cart and single checkout item after successful order
      }, 2000);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        cardType: ''
      });
      
    } catch (error) {
      console.error('Payment processing error:', error.response?.data || error.message);
      setIsProcessing(false);
    }
  };

  // After successful order, show success message and redirect after 3 seconds
  if (orderSuccess) {
    return (
      <MainLayout>
        <div className="order-success">
          <div className="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="success-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been placed successfully.</p>
            <p>You will receive an email confirmation shortly.</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Cleanup function to remove singleCheckoutItem when leaving the page
  useEffect(() => {
    return () => {
      // Only clear localStorage if the order is not successful
      // This prevents clearing if user just refreshes the page
      if (!orderSuccess) {
        localStorage.removeItem('singleCheckoutItem');
      }
    };
  }, [orderSuccess]);
  
  return (
    <MainLayout>
      <div className="checkout-page">
        <h1>Checkout</h1>
        
        <div className="checkout-container">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={errors.country ? 'error' : ''}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                    <option value="IN">India</option>
                  </select>
                  {errors.country && <span className="error-message">{errors.country}</span>}
                </div>
              </div>
              
              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'error' : ''}
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>
                
                <div className="form-group card-number-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <div className="card-input-container">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`card-input ${errors.cardNumber ? 'error' : ''}`}
                    />
                    {formData.cardType && (
                      <div className={`card-type ${formData.cardType}`}>
                        {formData.cardType === 'visa' && <span>Visa</span>}
                        {formData.cardType === 'mastercard' && <span>Mastercard</span>}
                        {formData.cardType === 'amex' && <span>Amex</span>}
                        {formData.cardType === 'discover' && <span>Discover</span>}
                      </div>
                    )}
                  </div>
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="back-to-cart-btn"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="place-order-btn"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {checkoutItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-line grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
