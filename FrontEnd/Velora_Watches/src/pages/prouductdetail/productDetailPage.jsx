import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import MainLayout from "../../components/layout/MainLayout/MainLayout";
import './productDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(productId));

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
            <img src={product.image} alt={`${product.name} main`} className="thumbnail active" />
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
          <p className="brand">Brand: {product.brand}</p>
          <p className="category">Category: {product.category}</p>
          <p className="price">${product.price}</p>

          <div className="short-description">{product.description}</div>

          {product.features && (
            <div className="features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.measurements && (
            <div className="measurements">
              <h3>Measurements</h3>
              <ul>
                {Object.entries(product.measurements).map(([key, val]) => (
                  <li key={key}><strong>{key}:</strong> {val}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" defaultValue={1} min={1} />
          </div>

          <button className="add-to-cart">🛒 Add to Cart</button>

          <div className="reviews">
            <h3>Customer Reviews</h3>
            {product.reviews?.length ? (
              product.reviews.map((rev, i) => (
                <div key={i} className="review">
                  {rev.rating} <p>{rev.comment}</p>
                </div>
              ))
            ) : (
              <>
                <div className="review">⭐⭐⭐⭐☆ <p>Very elegant design. Love it!</p></div>
                <div className="review">⭐⭐⭐⭐⭐ <p>Perfect gift for my husband.</p></div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
