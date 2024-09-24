"use client";

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FaMoon className="text-gray-800" />
      ) : (
        <FaSun className="text-yellow-300" /> // Changed from text-yellow-400 to text-yellow-300
      )}
    </button>
  );
};

export default ThemeSwitcher;