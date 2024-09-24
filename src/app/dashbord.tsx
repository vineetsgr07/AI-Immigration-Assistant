// pages/dashboard.tsx

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading.s..</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}