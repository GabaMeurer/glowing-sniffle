import React, { ReactNode } from 'react';
import Header from '@component/components/Header';
import { useRouter } from 'next/router';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  }

  return (
    <div>
      <Header handleNavigation={handleNavigation} />
      {children}
    </div>
  );
};

export default MainLayout;