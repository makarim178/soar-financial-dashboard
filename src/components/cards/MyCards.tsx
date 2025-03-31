'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import BankCard from './bankCard/BankCard';
import { CardDataType } from '@/src/types';

export default function MyCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Sample card data
  const [cards] = useState<CardDataType[]>([
    {
      id: '1',
      cardNumber: '3778 **** **** 1234',
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      balance: '$5,756',
      cardType: 'mastercard',
      isDark: true
    },
    {
      id: '2',
      cardNumber: '3778 **** **** 1234',
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      balance: '$5,756',
      cardType: 'visa',
      isDark: false
    },
    {
      id: '3',
      cardNumber: '3778 **** **** 1234',
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      balance: '$5,756',
      cardType: 'mastercard',
      isDark: true
    }
  ]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (scrollRef.current) {
      if (e.key === 'ArrowRight') {
        scrollRef.current.scrollLeft += 200;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        scrollRef.current.scrollLeft -= 200;
        e.preventDefault();
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-title">My Cards</h2>
        <Link 
          href="/credit-cards" 
          className="text-title text-sm font-medium hover:font-bold"
          aria-label="See all credit cards"
        >
          See All
        </Link>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto h-full pb-4 gap-4 scrollbar-hide snap-x"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            overflowY: 'hidden'
          }}
          tabIndex={0}
          role="region"
          aria-label="Credit cards carousel"
          aria-describedby="carousel-description"
          onKeyDown={handleKeyDown}
        >
          {cards.map((card, index) => (
            <div key={card.id} aria-posinset={index + 1} aria-setsize={cards.length}>
              <BankCard card={card} />
            </div>
          ))}
        </div>
        <p id="carousel-description" className="sr-only">
          Use arrow keys to navigate between cards
        </p>
      </div>
    </div>
  );
}
