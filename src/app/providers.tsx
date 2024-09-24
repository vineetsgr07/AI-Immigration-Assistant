"use client";

import React from 'react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '../contexts/ThemeContext';
import { ChatProvider } from '../contexts/ChatContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}