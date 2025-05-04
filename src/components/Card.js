import React from 'react';
import Image from 'next/image';

const CardDisplay = ({ cardData, imageUrl }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '300px',
      }}
    >
      <Image
        src={imageUrl}
        alt={cardData.cardName}
        width={300} // Set a default width
        height={400} // Set a default height
        style={{ borderRadius: '4px' }}
      />
      <h2 style={{ margin: '8px 0' }}>{cardData.cardName}</h2>
      <p>
        <strong>Set Number:</strong> {cardData.setNumber}
      </p>
      <p>
        <strong>Rarity:</strong> {cardData.rarity}
      </p>
    </div>
  );
};

export default CardDisplay;
