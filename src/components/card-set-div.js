import React from 'react';
import CardDisplay from './card-display';

const CardSetDiv = ({ cardSetData, cardSet }) => {
  console.log(cardSetData);
  console.log(cardSet);
  return (
    <div>
      <h1>{cardSet}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {Object.entries(cardSetData).map(([key, card]) => (
          <CardDisplay
            key={key}
            cardData={card}
            imageUrl={`/img/${cardSet.toLowerCase().replace(/\s+/g, '')}/${card.setNumber}.jpg`}
          />
        ))}
      </div>{' '}
    </div>
  );
};

export default CardSetDiv;
