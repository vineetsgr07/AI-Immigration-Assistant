"use client";

import React from 'react';
import Header from './components/Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false, onBack = () => {} }) => {
  return (
    <div className="flex flex-col h-screen bg-beacon-bg dark:bg-gray-900">
      <Header showBackButton={showBackButton} onBack={onBack} />
      <main className="flex-grow overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;