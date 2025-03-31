'use client';

import { createContext, useContext, useState } from 'react';
import { ContactType, QuickTransferContextType } from '@/src/types';

const QuickTransferContext = createContext<QuickTransferContextType | undefined>(undefined);

export function QuickTransferProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  return (
    <QuickTransferContext.Provider
      value={{ contacts, setContacts, hasMore, setHasMore, total, setTotal }}
    >
      {children}
    </QuickTransferContext.Provider>
  );
}

export function useQuickTransfer() {
    const context = useContext(QuickTransferContext);
    if (context === undefined) {
        throw new Error('useQuickTransfer must be used within a QuickTransferProvider');
    }
    return context;
}