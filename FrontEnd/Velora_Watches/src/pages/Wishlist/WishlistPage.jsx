import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <MainLayout>
      <div className="wishlist-page">
        <h1>My Wishlist</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="remove-from-wishlist"
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
                <div className="wishlist-item-info">
                  <h3>{item.name}</h3>
                  <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                  <div className="wishlist-item-actions">
                    <Link to={`/product/${item.id}`} className="view-product-btn">
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(item)} 
                      className="add-to-cart-from-wishlist"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-wishlist-message">
              <h2>Your wishlist is empty</h2>
              <p>Add items to your wishlist to save them for later.</p>
              <Link to="/products" className="shop-now-btn">Shop Now</Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WishlistPage;
