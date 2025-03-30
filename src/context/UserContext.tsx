'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userImageNumber, setUserImageNumber] = useState<number>(1);


  return (
    <UserContext.Provider
      value={{ userImageNumber, setUserImageNumber }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}