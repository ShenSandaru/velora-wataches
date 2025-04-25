import React from 'react';
import './WatchCards.css';

const WatchCards = () => {
  const watches = [
    {
      id: 1,
      name: "Classic Silver",
      price: "$299",
      image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch1.png",
      description: "Elegant timepiece with precision movement"
    },
    {
      id: 2,
      name: "Gold Premium",
      price: "$499",
      image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch2.png",
      description: "Luxury watch with premium features"
    },
    {
      id: 3,
      name: "Sport Edition",
      price: "$399",
      image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch3.png",
      description: "Perfect for active lifestyle"
    },
    {
      id: 4,
      name: "Modern Black",
      price: "$349",
      image: "https://raw.githubusercontent.com/Dhananjaya001/assignment-web-module/main/images/watch4.png",
      description: "Contemporary design with style"
    }
  ];

  return (
    <section className="watch-ads">
      <h2>Featured Collection</h2>
      <div className="watch-grid">
        {watches.map(watch => (
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