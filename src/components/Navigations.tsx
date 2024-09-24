// components/Navigation.tsx
"use client";

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      )}
    </nav>
  );
}