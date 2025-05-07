import React from 'react';
import { watchCardsData } from '../../../data/watchCardsData';
import './WatchCards.css';

const WatchCards = () => {
  return (
    <section className="watch-ads">
      <h2>Featured Collection</h2>
      <div className="watch-grid">
        {watchCardsData.map(watch => (
          <div key={watch.id} className="card">
            <div className="card-inner">
              <div className="card-front">
                <img src={watch.image} alt={watch.name} className="card-image" />
              </div>
              <div className="card-back">
                <h3>{watch.name}</h3>
                <p>{watch.description}</p>
                <p className="price">{watch.price}</p>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WatchCards;