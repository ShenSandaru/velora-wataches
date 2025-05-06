import React from "react";
import './ProductDetailPage.css';


const ProductDetail = () => {
  return (
    <div className="product-container">
      <div className="image-gallery">
        <img src="your-image-link-1.jpg" alt="Watch View 1" className="main-image" />
        <div className="thumbnail-row">
          <img src="your-image-link-2.jpg" alt="View 2" className="thumbnail" />
          <img src="your-image-link-3.jpg" alt="View 3" className="thumbnail" />
          <img src="your-image-link-4.jpg" alt="View 4" className="thumbnail" />
          {/* Add remaining 4 thumbnails */}
        </div>
      </div>

      <div className="details-section">
        <h1>Classic Silver Watch</h1>
        <p className="brand">Brand: Geneva</p>
        <p className="price">$299.99</p>

        <div className="short-description">
          A stylish silver watch with Roman numerals, great for both formal and casual wear.
        </div>

        <div className="measurements">
          <h3>Measurements:</h3>
          <ul>
            <li>Dial Diameter: 40mm</li>
            <li>Band Width: 20mm</li>
            <li>Band Length: 240mm</li>
            <li>Case Thickness: 8mm</li>
          </ul>
        </div>

        <div className="quantity">
          <label>Quantity:</label>
          <input type="number" defaultValue={1} min={1} />
        </div>

        <button className="add-to-cart">Add to Cart</button>

        <div className="reviews">
          <h3>Reviews</h3>
          <div className="review">
            ⭐⭐⭐⭐☆ <p>Very elegant design. Love it!</p>
          </div>
          <div className="review">
            ⭐⭐⭐⭐⭐ <p>Perfect gift for my husband.</p>
          </div>
          {/* Add more reviews as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
