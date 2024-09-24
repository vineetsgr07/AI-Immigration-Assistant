// src/app/features/layout/Layout.tsx
import React from 'react';
import Header from './components/Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton, onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-beacon-bg dark:bg-gray-900">
      <Header showBackButton={showBackButton || false} onBack={onBack || (() => {})} />
      <main className="flex-grow overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;