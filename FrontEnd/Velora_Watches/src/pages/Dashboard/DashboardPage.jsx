import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useUser } from '../../Context/UserContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import { userAPI } from '../../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useUser();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock data for orders - in a real app, you would fetch this from your API
  const mockOrders = [
    { id: '12345', date: '2025-04-28', status: 'Delivered', total: 599.98, items: 2 },
    { id: '12346', date: '2025-04-15', status: 'Shipped', total: 299.99, items: 1 },
    { id: '12347', date: '2025-03-22', status: 'Processing', total: 499.97, items: 3 },
  ];
  
  // Handle adding item to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  
  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    
    // Clear errors when typing
    if (passwordErrors[name]) {
      setPasswordErrors({ ...passwordErrors, [name]: '' });
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Add debug logging to password change handlers
const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  
  if (!validatePasswordForm()) {
    console.log('Form validation failed', passwordErrors);
    return;
  }
  
  setIsChangingPassword(true);
  setPasswordSuccess('');
  console.log('Submitting password change request');
  console.log('Current password length:', passwordData.currentPassword.length);
  console.log('New password length:', passwordData.newPassword.length);
  
  try {
    await userAPI.changePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );
    
    console.log('Password change API call successful');
    setPasswordSuccess('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  } catch (error) {
    console.error('Password change error:', error);
    setPasswordErrors({ 
      form: error.message || 'Failed to update password. Please try again.'
    });
  } finally {
    setIsChangingPassword(false);
  }
};

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
          <p>Manage your account, orders, and wishlist</p>
        </div>
        
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <ul className="dashboard-tabs">
              <li 
                className={activeTab === 'profile' ? 'active' : ''} 
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </li>
              <li 
                className={activeTab === 'orders' ? 'active' : ''} 
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </li>
              <li 
                className={activeTab === 'wishlist' ? 'active' : ''} 
                onClick={() => setActiveTab('wishlist')}
              >
                Wishlist
              </li>
              <li 
                className={activeTab === 'settings' ? 'active' : ''} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </li>
            </ul>
          </div>
          
          <div className="dashboard-content">
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <h2>My Profile</h2>
                <div className="profile-info">
                  <div className="info-group">
                    <label>Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-group">
                    <label>Member Since</label>
                    <p>April 2025</p>
                  </div>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="orders-tab">
                <h2>My Orders</h2>
                {mockOrders.length > 0 ? (
                  <div className="orders-list">
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.date}</td>
                            <td>
                              <span className={`status ${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>{order.items}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                              <button className="view-order-btn">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>You haven't placed any orders yet.</p>
                    <button className="shop-now-btn">Shop Now</button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="wishlist-tab">
                <h2>My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="wishlist-grid">
                    {wishlistItems.map(item => (
                      <div className="wishlist-item" key={item.id}>
                        <Link to={`/product/${item.id}`} className="wishlist-item-image">
                          <img src={item.image} alt={item.name} />
                        </Link>
                        <div className="wishlist-item-details">
                          <h3>{item.name}</h3>
                          <p className="price">${item.price.toFixed(2)}</p>
                          <div className="wishlist-actions">
                            <button 
                              className="add-to-cart"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </button>
                            <button 
                              className="remove-wishlist"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>Your wishlist is empty.</p>
                    <Link to="/products" className="shop-now-btn">Discover Watches</Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="settings-tab">
                <h2>Account Settings</h2>
                <div className="settings-section">
                  <h3>Password</h3>
                  <form className="settings-form" onSubmit={handlePasswordSubmit}>
                    {passwordSuccess && (
                      <div className="success-message">
                        {passwordSuccess}
                      </div>
                    )}
                    
                    {passwordErrors.form && (
                      <div className="error-message">
                        {passwordErrors.form}
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input 
                        type="password" 
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        className={passwordErrors.currentPassword ? 'error' : ''}
                      />
                      {passwordErrors.currentPassword && (
                        <span className="error-text">{passwordErrors.currentPassword}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input 
                        type="password" 
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className={passwordErrors.newPassword ? 'error' : ''}
                      />
                      {passwordErrors.newPassword && (
                        <span className="error-text">{passwordErrors.newPassword}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className={passwordErrors.confirmPassword ? 'error' : ''}
                      />
                      {passwordErrors.confirmPassword && (
                        <span className="error-text">{passwordErrors.confirmPassword}</span>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="update-password-btn"
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
                
                <div className="settings-section">
                  <h3>Email Preferences</h3>
                  <div className="settings-form">
                    <div className="form-checkbox">
                      <input type="checkbox" id="newsletter" defaultChecked />
                      <label htmlFor="newsletter">Subscribe to newsletter</label>
                    </div>
                    <div className="form-checkbox">
                      <input type="checkbox" id="promotions" defaultChecked />
                      <label htmlFor="promotions">Receive promotional emails</label>
                    </div>
                    <div className="form-checkbox">
                      <input type="checkbox" id="orders" defaultChecked />
                      <label htmlFor="orders">Order updates</label>
                    </div>
                    <button className="save-preferences-btn">Save Preferences</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;