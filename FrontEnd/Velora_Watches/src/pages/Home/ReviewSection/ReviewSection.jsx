import React from 'react';
import './ReviewSection.css';

const ReviewSection = ({ reviews }) => {
  const loopedReviews = [...reviews, ...reviews];

  return (
    <section className="review-section">
      <div className="review-panel" style={{ maxWidth: '1000px' }}>
        <div className="review-header">
          <h1 className="brand-title">What Our Customers Say</h1>
          <div className="review-google-icon">
            <img
              src="https://reviewgrower.com/wp-content/uploads/2023/03/580b57fcd9996e24bc43c51f.png"
              alt="Google Icon"
            />
          </div>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="score">4.8</span>
          </div>
          <button className="review-btn">
            Review us on <span role="img" aria-label="smile">😊</span>
          </button>
        </div>
        <div className="reviews-marquee-outer">
          <div className="reviews-marquee-inner">
            {loopedReviews.map((review, idx) => (
              <div className="review-card" key={idx}>
                <div className="reviewer-info">
                  <img
                    src={review.profilePhoto}
                    alt={review.name}
                    className="reviewer-photo"
                  />
                  <div className="reviewer-details">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="review-time">{review.time}</span>
                  </div>
                </div>
                <div className="review-stars">{review.stars}</div>
                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;