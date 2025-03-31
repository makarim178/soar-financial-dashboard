'use client';
import { useRef, Suspense } from 'react';
import Link from 'next/link';
import BankCard from './bankCard/BankCard';
import { CardDataType } from '@/src/types';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { getApiUrl } from '@/src/utils/getApiUrl';
import { useQuery } from '@tanstack/react-query';

// Function to fetch card data
const fetchCardData = async (): Promise<CardDataType[]> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/cards`);
  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

// Component that uses the data
function CardContent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: cards = [] } = useQuery({
    queryKey: ['cardData'],
    queryFn: fetchCardData,
  });

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
    <>
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
    </>
  );
}

export default function MyCards() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="h-[200px] flex items-center justify-center" aria-live="polite" aria-busy="true">
          <DefaultLoader />
        </div>
      }>
        <CardContent />
      </Suspense>
    </div>
  );
}
