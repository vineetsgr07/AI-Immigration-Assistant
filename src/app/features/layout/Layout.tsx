// src/app/features/layout/Layout.tsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
  isChat?: boolean; // New prop to identify chat interface
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton, onBack, title, isChat = false }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isChat) {
      setHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isChat]);

  return (
    <div className={`flex flex-col min-h-screen bg-beacon-bg dark:bg-gray-900 ${isChat ? 'overflow-hidden' : ''}`}>
      <div className={`transition-transform duration-300 ${
        isChat ? 'fixed top-0 left-0 right-0 z-10' : headerVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Header title={title} showBackButton={showBackButton || false} onBack={onBack || (() => {})} />
      </div>
      <main className={`flex-grow ${isChat ? 'overflow-hidden pt-16' : 'overflow-y-auto'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;