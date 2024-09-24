"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Provider } from "next-auth/providers"

export default function SignInButton({ provider }: { provider: Provider }) {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
}