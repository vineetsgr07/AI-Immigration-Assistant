// test-utils.tsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SessionProvider } from "next-auth/react";

function render(ui: React.ReactElement, { session = null, ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SessionProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };