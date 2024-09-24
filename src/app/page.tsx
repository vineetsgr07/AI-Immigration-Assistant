"use client"

import React from 'react';
import LandingPage from '@/app/features/landing/LandingPage';
import { useSession } from 'next-auth/react';
import { Loader } from '@/components/Loader';
export default function RootPage() {
  const { status } = useSession();
  
  if (status === 'loading') {
    return <Loader />;
  }

  return <LandingPage />;
}