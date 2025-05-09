import React from 'react';
import './RotatingOffers.css';

const RotatingOffers = () => {
  const offers = [
    {
      image: "https://img.freepik.com/free-psd/gradient-social-media-giveaway-invitation_23-2150871647.jpg?ga=GA1.1.562854386.1736516454&semt=ais_hybrid&w=740",
      alt: 'Watch Offer'
    },
    {
      image: "https://github.com/Dhananjaya001/assignment-web-module/blob/main/images/image4.jpg?raw=true",
      alt: 'Watch Offer'
    },
    {
      image: "https://img.freepik.com/free-psd/black-friday-super-sale-social-media-banner-template_106176-1487.jpg?ga=GA1.1.562854386.1736516454&semt=ais_hybrid&w=740",
      alt: 'Watch Offer'
    },
    {
      image: "https://github.com/Dhananjaya001/assignment-web-module/blob/main/images/image3.jpg?raw=true",
      alt: 'Watch Offer'
    },
    {
      image: 'https://github.com/Dhananjaya001/assignment-web-module/blob/main/images/Black%20Elegant%20Watch%20Special%20Offer%20Instagram%20Post-2%5B1%5D.jpg?raw=true',
      alt: 'Watch Offer'
    },
  ];

  return (
    <section className="rotating-offers">
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <img src={offer.image} alt={offer.alt} className="offer-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RotatingOffers;