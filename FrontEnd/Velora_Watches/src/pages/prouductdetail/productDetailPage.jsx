// ProductDetailPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import "./productDetailPage.css";
import { FaStar, FaRegStar, FaShareAlt } from "react-icons/fa";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p.id === Number(productId));

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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? <FaStar key={i} color="#ffc107" /> : <FaRegStar key={i} color="#ddd" />
    );
  };

  return (
    <MainLayout>
      <div className="breadcrumb">Home / Products / {product.name}</div>
      <div className="product-container">
        <div className="image-gallery">
          <img
            src={product.additionalImages?.[activeImage] || product.image}
            alt={product.name}
            className="main-image"
          />
          <div className="thumbnail-row">
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                className={`thumbnail ${activeImage === index ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <h1>{product.name}</h1>
          <p className="brand">Brand: {product.brand}</p>
          <p className="price">${product.price}</p>
          <p className="stock-status">{product.inStock ? "In Stock" : "Out of Stock"}</p>
          <div className="stars">{renderStars(product.rating || 4)}</div>
          <div className="short-description">{product.description}</div>

          <div className="quantity">
            <label>Quantity:</label>
            <input type="number" defaultValue={1} min={1} />
          </div>

          <button className="add-to-cart">Add to Cart</button>
          <FaShareAlt className="share-icon" title="Share this product" />
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>Description</button>
        <button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>Reviews</button>
        <button onClick={() => setActiveTab("specs")} className={activeTab === "specs" ? "active" : ""}>Measurements</button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && <p>{product.longDescription}</p>}

        {activeTab === "reviews" && (
          <div className="reviews">
            {product.reviews?.map((rev, i) => (
              <div key={i} className="review">
                {renderStars(rev.rating)}
                <p>{rev.comment}</p>
              </div>
            )) || <p>No reviews yet.</p>}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="specs">
            <ul>
              {product.measurements?.map((m, i) => (
                <li key={i}>{m}</li>
              )) || <p>No specifications provided.</p>}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
