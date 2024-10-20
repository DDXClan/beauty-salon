import React, { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

const SidebarContext = createContext<boolean | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSidebarVisible = pathname !== '/login';

  return (
    <SidebarContext.Provider value={isSidebarVisible}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
