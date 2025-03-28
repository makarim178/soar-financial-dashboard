'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Contact {
  id: number;
  name: string;
  position: string;
  avatar: string;
  lastTransfer: string;
}

export default function QuickTransfer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [offset, setOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const limit = 3;

  // Fetch contacts
  const fetchContacts = async (newOffset = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quick-transfer?limit=${limit}&offset=${newOffset}`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (newOffset === 0) {
        setContacts(data.contacts);
      } else {
        setContacts(prev => [...prev, ...data.contacts]);
      }
      
      setHasMore(data.hasMore);
      setOffset(newOffset);
      
      // Select the first contact by default if none is selected
      if (!selectedContact && data.contacts.length > 0) {
        setSelectedContact(data.contacts[0]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  // Load more contacts
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchContacts(offset + limit);
    }
  };

  // Handle transfer submission
  const handleTransfer = async () => {
    if (!selectedContact) {
      setError('Please select a contact');
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quick-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId: selectedContact.id,
          amount: parseFloat(amount),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Reset form
      setAmount('');
      
      // Refresh contacts to show updated order
      fetchContacts(0);
      
      // Show success message or toast here if needed
    } catch (error) {
      console.error('Error submitting transfer:', error);
      setError('Failed to process transfer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h[326px]">
      <h3 className="text-xl font-semibold mb-4 text-title">Quick Transfer</h3>
      <div className="flex flex-col justify-around bg-white rounded-3xl shadow p-6 max-w-[445px] min-h-[348px]">
        <div className="relative ">
          <div className="flex justify-center space-x-8 mb-4">
            {loading && contacts.length === 0 ? (
              <div className="flex justify-center w-full">
                <p className="text-gray-500">Loading contacts...</p>
              </div>
            ) : (
              contacts.slice(0, 3).map((contact) => (
                <div 
                  key={contact.id}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedContact?.id === contact.id ? 'opacity-100' : 'opacity-70'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 ${
                    selectedContact?.id === contact.id ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <Image 
                      src={contact.avatar} 
                      alt={contact.name} 
                      width={96} 
                      height={96} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="font-bold text-[#343C6A] text-lg">{contact.name}</h4>
                  <p className="text-[#718EBF]">{contact.position}</p>
                </div>
              ))
            )}
          </div>
          
          {/* Next button */}
          {hasMore && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
              onClick={loadMore}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#718EBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          {/* <div className="flex-1 mr-4"> */}

          <div>
              <label htmlFor="amount" className="text-base font-normal text-trans-date block mb-1">Write Amount</label>
          </div>
          <div className="flex justify-center items-center bg-[#EDF1F7] rounded-full w-[265px] h-[50px]">
            <div>
              <input
                type="text"
                id="amount"
                value={amount}
                placeholder="525.50"
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent px-4 w-full outline-none text-[#343C6A] text-lg font-medium"
              />
            </div>
            <div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                onClick={handleTransfer}
                disabled={isSubmitting || !selectedContact || !amount}
                className="h-[50px] w-[125px] bg-soar-dark text-white rounded-full px-8 py-4 flex items-center disabled:opacity-70"
              >
                <span className="mr-2 font-medium">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>          
        </div>
      </div>      
    </div>
  );
}