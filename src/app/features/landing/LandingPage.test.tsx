// LandingPage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@/utils/test-utils';
import LandingPage from './LandingPage';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the ChatInterface component
jest.mock('@/app/features/chat/ChatInterface', () => {
  return function MockChatInterface({ botType }: { botType: string }) {
    return <div data-testid="chat-interface">Chat Interface for {botType}</div>;
  };
});

describe('LandingPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders hero and cards initially', () => {
    render(<LandingPage />, {
      session: { user: { name: 'Test User' } } as any,
    });
    
    expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument();
    expect(screen.getByText('Simplify Your Path to a New Life in Canada')).toBeInTheDocument();
    expect(screen.getByText('Immigration Assistant')).toBeInTheDocument();
    expect(screen.getByText('General Information')).toBeInTheDocument();
  });

  it('shows ChatInterface when Immigration Assistant card is clicked', () => {
    render(<LandingPage />, {
      session: { user: { name: 'Test User' } } as any,
    });
    
    fireEvent.click(screen.getByText('Immigration Assistant'));
    
    expect(screen.getByTestId('chat-interface')).toHaveTextContent('Chat Interface for immigration');
  });

  // Add more tests as needed
});