'use client';

import { useState, useRef, Suspense } from 'react';
import { useQuickTransfer } from '@/src/context/QuickTransferContext';
import { fetchQuickTransferData } from '@/src/services/api-services';
import Contact from '../contact/Contact';
import QuickPay from '../quickPay/QuickPay';
import { ContactType } from '@/src/types';
import SectionCard from './sectionCard/SectionCard';
import QuickTransferLoader from '../loaders/QuickTransferLoader';
import { useQuery } from '@tanstack/react-query';

// Component that uses the data
function ContactsList({ setSelectedContact, selectedContact }: { 
  setSelectedContact: (contact: ContactType | null) => void, 
  selectedContact: ContactType | null 
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [rotateChevron, setRotateChevron] = useState(false);
  const { contacts, setContacts, setHasMore } = useQuickTransfer();
  
  const { data } = useQuery({
    queryKey: ['quickTransferContacts'],
    queryFn: () => fetchQuickTransferData({ limit: 3, offset: 0 }),
  });
  
  // Set initial contacts if not already set
  if (contacts && contacts?.length === 0 && data?.contacts?.length > 0) {
    if (data?.contacts) setContacts(data.contacts);
    if (data?.hasMore) setHasMore(data.hasMore);
  }

  const handleNavigation = () => {
    if (scrollRef.current) {
      if (!rotateChevron) scrollRef.current.scrollLeft += 200;
        else {
          scrollRef.current.scrollLeft = 0;
          setRotateChevron(!rotateChevron);
        }
    }
  }

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex overflow-x-auto h-full p-4 gap-6 scrollbar-hide scroll-smooth snap-x">
        {contacts.map((contact: ContactType) => (
          <Contact 
            key={contact.id} 
            contact={contact} 
            selectedContactId={selectedContact?.id || 0} 
            setSelectedContact={setSelectedContact} 
          />
        ))}
      </div>
      <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
        onClick={handleNavigation}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 text-[#718EBF] transform ${rotateChevron ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function QuickTransfer() {
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);

  return (
    <SectionCard title="Quick Transfer">
      <Suspense fallback={
        <div className="flex items-center justify-center py-4" aria-live="polite" aria-busy="true">
          <QuickTransferLoader />
        </div>
      }>
        <ContactsList 
          setSelectedContact={setSelectedContact} 
          selectedContact={selectedContact} 
        /> 
        <QuickPay selectedContact={selectedContact} />
      </Suspense>
    </SectionCard>
  );
}
