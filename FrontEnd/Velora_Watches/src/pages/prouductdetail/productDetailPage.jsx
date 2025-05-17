import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { getProductById } from '../../services/productService'; // Adjust based on your actual service
import './productDetailPage.css';

const ProductDetailPage = () => {
  console.log('ProductDetailPage rendering');
  const { productId } = useParams();
  console.log('Product ID from params:', productId);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      if (!productId) {
        console.error('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching product with ID: ${productId}`);
        const product = await getProductById(productId);
        console.log('Product data received:', product);
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="product-detail-loading">Loading product details...</div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="product-not-found">Product not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <span>Quantity:</span>
              <div className="quantity-controls">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;