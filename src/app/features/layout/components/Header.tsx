import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  showBackButton: boolean;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onBack }) => {
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
          <h1 className="text-2xl font-bold text-beacon-dark dark:text-beacon-white">AI Immigration Assistant</h1>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;