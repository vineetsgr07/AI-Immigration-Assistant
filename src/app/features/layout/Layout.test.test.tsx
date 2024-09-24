// Layout.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';

// Mock the Header component
jest.mock('./components/Header', () => {
  return function MockHeader({ showBackButton, onBack }: { showBackButton: boolean, onBack: () => void }) {
    return (
      <header data-testid="mock-header">
        {showBackButton && <button onClick={onBack}>Back</button>}
      </header>
    );
  };
});

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-element">Child content</div>
      </Layout>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toHaveTextContent('Child content');
  });

  it('renders Header component', () => {
    render(<Layout children={<div data-testid="child-element">Child content</div>} />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('passes showBackButton prop to Header', () => {
    render(<Layout showBackButton={true} children={<div data-testid="child-element">Child content</div>} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('does not show back button when showBackButton is false', () => {
    render(<Layout showBackButton={false} children={<div data-testid="child-element">Child content</div>} />);
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('calls onBack function when back button is clicked', () => {
    const mockOnBack = jest.fn();
    render(<Layout showBackButton={true} onBack={mockOnBack} children={<div data-testid="child-element">Child content</div>} />);
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    backButton.click();

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes', () => {
    render(<Layout children={<div data-testid="child-element">Child content</div>} />);
    const layoutDiv = screen.getByTestId('mock-header').parentElement;
    expect(layoutDiv).toHaveClass('flex', 'flex-col', 'h-screen', 'bg-beacon-bg', 'dark:bg-gray-900');
  });

  it('renders main element with correct classes', () => {
    render(<Layout children={<div data-testid="child-element">Child content</div>} />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('flex-grow', 'overflow-hidden');
  });
});