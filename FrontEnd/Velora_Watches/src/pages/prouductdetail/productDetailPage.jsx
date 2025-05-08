import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import './productDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Find the product with the matching ID
  const product = products.find(p => p.id === Number(productId));
  
  // If product not found, show error or redirect
  if (!product) {
    return (
      <MainLayout>
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/products")} className="back-btn">
            Back to Products
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-container">
        <div className="image-gallery">
          <img src={product.image} alt={product.name} className="main-image" />
          <div className="thumbnail-row">
            {/* If you have multiple images, you could map through them here */}
            <img src={product.image} alt={`${product.name} view 1`} className="thumbnail active" />
            {/* Example of additional images if available */}
            {product.additionalImages?.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} view ${index + 2}`} 
                className="thumbnail" 
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <h1>{product.name}</h1>
          <p className="brand">Category: {product.category}</p>
          <p className="price">${product.price}</p>

          <div className="short-description">
            {product.description}
          </div>

          {product.features && (
            <div className="features">
              <h3>Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="quantity">
            <label>Quantity:</label>
            <input type="number" defaultValue={1} min={1} />
          </div>

          <button className="add-to-cart">Add to Cart</button>

          {/* Mock reviews section */}
          <div className="reviews">
            <h3>Reviews</h3>
            <div className="review">
              ⭐⭐⭐⭐☆ <p>Very elegant design. Love it!</p>
            </div>
            <div className="review">
              ⭐⭐⭐⭐⭐ <p>Perfect gift for my husband.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;