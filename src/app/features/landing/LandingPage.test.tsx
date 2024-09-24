// src/app/features/landing/LandingPage.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from './LandingPage';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { LANDING_PAGE_TEXT } from '@/constant/landing';

jest.mock('@/app/features/chat/ChatInterface', () => {
  return function MockChatInterface({ botType }: { botType: string }) {
    return <div data-testid="chat-interface">Chat Interface for {botType}</div>;
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <ChatProvider>{ui}</ChatProvider>
    </ThemeProvider>
  );
};

describe('LandingPage', () => {
    it('renders hero and cards initially', () => {
      renderWithProviders(<LandingPage />);
      
      expect(screen.getByText(LANDING_PAGE_TEXT.HERO_TITLE)).toBeInTheDocument();
      expect(screen.getByText(LANDING_PAGE_TEXT.IMMIGRATION_ASSISTANT)).toBeInTheDocument();
      expect(screen.getByText(LANDING_PAGE_TEXT.GENERAL_INFORMATION)).toBeInTheDocument();
    });
  
    it('shows ChatInterface when Immigration Assistant card is clicked', () => {
      renderWithProviders(<LandingPage />);
      
      fireEvent.click(screen.getByText(LANDING_PAGE_TEXT.IMMIGRATION_ASSISTANT));
      
      expect(screen.getByTestId('chat-interface')).toHaveTextContent('Chat Interface for immigration');
      expect(screen.queryByText(LANDING_PAGE_TEXT.HERO_TITLE)).not.toBeInTheDocument();
    });
  
    it('shows ChatInterface when General Information card is clicked', () => {
      renderWithProviders(<LandingPage />);
      
      fireEvent.click(screen.getByText(LANDING_PAGE_TEXT.GENERAL_INFORMATION));
      
      expect(screen.getByTestId('chat-interface')).toHaveTextContent('Chat Interface for general');
      expect(screen.queryByText(LANDING_PAGE_TEXT.HERO_TITLE)).not.toBeInTheDocument();
    });
  
    it('returns to landing page when back button is clicked', () => {
      renderWithProviders(<LandingPage />);
      
      fireEvent.click(screen.getByText(LANDING_PAGE_TEXT.IMMIGRATION_ASSISTANT));
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument();
      
      fireEvent.click(screen.getByLabelText('Go back'));
      expect(screen.getByText(LANDING_PAGE_TEXT.HERO_TITLE)).toBeInTheDocument();
      expect(screen.queryByTestId('chat-interface')).not.toBeInTheDocument();
    });
  });