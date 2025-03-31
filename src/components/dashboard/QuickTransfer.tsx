'use client';

import { useState } from 'react';
import QuickPay from '../quickPay/QuickPay';
import { ContactType } from '@/src/types';
import SectionCard from './sectionCard/SectionCard';
import QuickTransferLoader from '../loaders/QuickTransferLoader';
import { ContactsList } from '../contactList/ContactList';

// Component that uses the data

export default function QuickTransfer() {
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SectionCard title="Quick Transfer">
      {
        isLoading ? (
          <div className="flex items-center justify-center py-4" aria-live="polite" aria-busy="true">
            <QuickTransferLoader />
          </div>
        ) : (
          <>
            <ContactsList 
              setSelectedContact={setSelectedContact} 
              selectedContact={selectedContact} 
              setIsLoading={setIsLoading}
            /> 
            <QuickPay selectedContact={selectedContact} />
          </>
        )
      }
    </SectionCard>
  );
}
