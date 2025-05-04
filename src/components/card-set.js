import React from 'react';
import CardDisplay from './card-display';

const CardSet = ({ cardSetData, cardSet }) => {
  return (
    <div>
      <h1>{cardSet}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {cardSetData.map((card) => (
          <CardDisplay
            key={card.setNumber}
            cardData={card}
            imageUrl={`/img/${cardSet.toLowerCase().replace(/\s+/g, '')}/${card.setNumber}.jpg`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSet;
