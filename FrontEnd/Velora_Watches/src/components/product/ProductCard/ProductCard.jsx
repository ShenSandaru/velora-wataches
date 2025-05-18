import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../../../Context/CartContext";
import { useWishlist } from "../../../Context/WishlistContext";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  
  // Check if product is in wishlist
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    
    // Reset "Added to cart" message after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  
  const handleToggleWishlist = () => {
    // Use the context method to toggle wishlist state
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        <button 
          onClick={handleToggleWishlist}
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>
      
      <div className="product-actions">
        <div className="quantity-controls">
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (quantity > 1) setQuantity(quantity - 1);
            }}
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setQuantity(quantity + 1);
            }}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        
        <button 
          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;