'use client';

import CardDisplay from '@/components/card-display';
import Image from 'next/image';
import { emptyCollection } from '@/data/empty-collection';
import CardSetDiv from '@/components/card-set-div';
import CardSet from '@/services/dto/card-set';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Home() {
  const [activeTab, setActiveTab] = useState(Object.values(CardSet)[0]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto', // Enable horizontal scrolling
          whiteSpace: 'nowrap', // Prevent wrapping
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {Object.values(CardSet).map((cardSet) => (
          <button
            key={cardSet}
            onClick={() => setActiveTab(cardSet)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: activeTab === cardSet ? '#0070f3' : '#ccc',
              color: activeTab === cardSet ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            {cardSet}
          </button>
        ))}
      </div>

      {activeTab && (
        <CardSetDiv
          cardSetData={emptyCollection[activeTab]}
          cardSet={activeTab}
        />
      )}
    </div>
  );
}
