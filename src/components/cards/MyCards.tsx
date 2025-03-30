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

  return (
    <div className="w-full max-w-[730px] mx-auto md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-title">My Cards</h2>
        <Link href="/cards" className="text-title text-sm font-medium">See All</Link>
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
        >
          {cards.map((card) => (
            <BankCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
