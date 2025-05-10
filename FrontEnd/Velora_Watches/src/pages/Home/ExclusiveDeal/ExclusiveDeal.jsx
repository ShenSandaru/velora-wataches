import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExclusiveDeal.css';

const ExclusiveDeal = ({ specialOffer }) => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 36,
    seconds: 0
  });

  // Effect to update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        // Calculate new time values
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Timer completed, reset or handle end of promotion
                days = 14;
                hours = 8;
                minutes = 36;
                seconds = 0;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="special-offer">
      <div className="special-offer-container">
        <div className="special-offer-image">
          <img 
            src={specialOffer.image} 
            alt="Special Offer" 
          />
          <div className="special-offer-badge">
            <span>Limited Time</span>
          </div>
        </div>
        <div className="special-offer-content">
          <span className="special-offer-label">Exclusive Deal</span>
          <h2>{specialOffer.title}</h2>
          <p>{specialOffer.description}</p>
          <div className="special-offer-cta">
            <Link to={specialOffer.link}>
              <button className="special-offer-btn">Shop Now</button>
            </Link>
            <div className="special-offer-timer">
              <div className="timer-item">
                <span className="timer-value">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="timer-label">Days</span>
              </div>
              <div className="timer-item">
                <span className="timer-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="timer-label">Hours</span>
              </div>
              <div className="timer-item">
                <span className="timer-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="timer-label">Mins</span>
              </div>
              <div className="timer-item">
                <span className="timer-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="timer-label">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeal;