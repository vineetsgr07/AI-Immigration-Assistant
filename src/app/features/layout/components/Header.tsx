"use client";

import React from 'react';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  showBackButton: boolean;
  onBack: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onBack, title }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    console.log("signing out");
    const result = await signOut({ redirect: false, callbackUrl: "/auth/signin" });
    router.push(result.url);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={onBack}
              className="mr-4 text-beacon-dark dark:text-beacon-white hover:text-beacon-primary dark:hover:text-beacon-primary-light transition-colors duration-200"
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
          )}
          <h1 className="text-2xl font-bold text-beacon-dark dark:text-beacon-white">{title}</h1>
        </div>
        <div className="flex items-center">
          <ThemeSwitcher />
            <button
              onClick={handleSignOut}
              className="ml-4 text-beacon-dark dark:text-beacon-white hover:text-beacon-primary dark:hover:text-beacon-primary-light transition-colors duration-200"
              aria-label="Sign out"
            >
              <FaSignOutAlt />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;