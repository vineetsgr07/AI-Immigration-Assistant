// Layout.test.tsx

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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
    const { container } = render(<Layout children={<div data-testid="child-element">Child content</div>} />);
    const layoutDiv = container.firstChild;
    expect(layoutDiv).toHaveClass('flex', 'flex-col', 'min-h-screen', 'bg-beacon-bg', 'dark:bg-gray-900');
    expect(layoutDiv).not.toHaveClass('overflow-hidden');
  });

  it('renders a scrollable main element on regular pages', () => {
    render(<Layout children={<div data-testid="child-element">Child content</div>} />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('flex-grow', 'overflow-y-auto');
    expect(mainElement).not.toHaveClass('overflow-hidden');
  });

  it('locks scrolling and pins the header in chat mode', () => {
    const { container } = render(<Layout isChat children={<div data-testid="child-element">Child content</div>} />);
    expect(container.firstChild).toHaveClass('overflow-hidden');
    expect(screen.getByRole('main')).toHaveClass('flex-grow', 'overflow-hidden', 'pt-16');
    expect(screen.getByTestId('mock-header').parentElement).toHaveClass('fixed', 'top-0');
  });

  describe('header on scroll', () => {
    const scrollTo = (y: number) => {
      Object.defineProperty(window, 'scrollY', { value: y, writable: true, configurable: true });
      act(() => {
        fireEvent.scroll(window);
      });
    };

    afterEach(() => scrollTo(0));

    it('hides when scrolling down and shows again when scrolling up', () => {
      render(<Layout children={<div data-testid="child-element">Child content</div>} />);
      const headerWrapper = screen.getByTestId('mock-header').parentElement;
      expect(headerWrapper).toHaveClass('translate-y-0');

      scrollTo(200);
      expect(headerWrapper).toHaveClass('-translate-y-full');

      scrollTo(50);
      expect(headerWrapper).toHaveClass('translate-y-0');
    });

    it('stays visible in chat mode', () => {
      render(<Layout isChat children={<div data-testid="child-element">Child content</div>} />);
      const headerWrapper = screen.getByTestId('mock-header').parentElement;

      scrollTo(200);
      expect(headerWrapper).not.toHaveClass('-translate-y-full');
    });
  });
});