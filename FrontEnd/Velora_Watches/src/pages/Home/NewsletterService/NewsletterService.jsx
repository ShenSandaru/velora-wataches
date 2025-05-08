import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../../services/api';
import './NewsletterService.css';

const NewsletterService = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Handle input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubscribeMessage('');
    setPreviewUrl('');
    
    try {
      // Use the API service to subscribe
      const data = await subscribeToNewsletter(email);
      
      setSubscribeMessage(data.message || 'Thank you for subscribing! Check your email for your discount code.');
      setMessageType('success');
      
      // Store preview URL if available (for development only)
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      
      setEmail('');
    } catch (error) {
      setSubscribeMessage('Failed to subscribe. Please try again later.');
      setMessageType('error');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for exclusive offers and updates</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="newsletter-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {subscribeMessage && (
          <div className={`subscription-message ${messageType}`}>
            {subscribeMessage}
          </div>
        )}
        {/* Show preview link in development only */}
        {previewUrl && (
          <div className="dev-preview">
            <p>Development Mode - Email Preview:</p>
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              View Email
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterService;