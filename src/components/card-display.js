import React from 'react';
import Image from 'next/image';

const CardDisplay = ({ cardData, imageUrl }) => {
  return (
    <div style={{ width: '20vw', maxWidth: '250px', margin: '0 auto' }}>
      {' '}
      {/* Set width as a percentage of the viewport */}
      <Image
        src={imageUrl}
        alt={cardData.cardName}
        layout="responsive" // Use responsive layout for better quality
        width={0} // Set width to 0 to use style for responsive sizing
        height={0} // Set height to 0 to maintain aspect ratio
        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
      />
    </div>
  );
};

export default CardDisplay;
