"use client"

import React from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/dashboard" })
    if (result?.error) {
      console.error(result.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Sign in to AI Immigration Assistant</h1>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}