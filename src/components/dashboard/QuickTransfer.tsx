'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuickTransfer } from '@/src/context/QuickTransferContext';
import { fetchQuickTransferData } from '@/src/services/api-services';
import Contact from '../contact/Contact';
import QuickPay from '../quickPay/QuickPay';
import { ContactType, QuickTransferDataType } from '@/src/types';


export default function QuickTransfer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { contacts, setContacts, hasMore, setHasMore } = useQuickTransfer();
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [rotateChevron, setRotateChevron] = useState(false);
  

  const onInteraction = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      if (hasMore) {
        loadMoreContacts();
      } else {
        setRotateChevron(!rotateChevron);
      }
    }
  }

  useEffect(() => {
    const observerLast = new IntersectionObserver(onInteraction);      
    const lastElement = scrollRef.current?.lastElementChild;
    if (contacts.length > 0 && lastElement) {
      observerLast.observe(lastElement);
    } else {
      fetchQuickTransferData({ limit: 3, offset: 0 }).then(({ contacts, hasMore }: QuickTransferDataType) => {
        setContacts(contacts);
        setHasMore(hasMore);
      });
    }

    return () => {
      if (lastElement) observerLast.unobserve(lastElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const loadMoreContacts = () => {
    if (!hasMore) return;
    const offset = contacts.length;
    fetchQuickTransferData({ limit: 3, offset }).then(({ contacts, hasMore }: QuickTransferDataType) => {
      setContacts((prev: ContactType[]) => [...prev, ...contacts]);
      setHasMore(hasMore);
    });
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
    <div className="min-h[326px]">
      <h3 className="text-xl font-semibold mb-4 text-title">Quick Transfer</h3>
      <div className={`flex flex-col justify-around bg-white rounded-3xl shadow p-6 min-h-[348px]`}>
        <div className="relative ">
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
        <QuickPay selectedContact={selectedContact} />
      </div>      
    </div>
  );
}