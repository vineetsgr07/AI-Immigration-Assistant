"use client"

import React from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { FaPassport } from "react-icons/fa"
import { SIGNIN_TEXT } from "@/constant/auth"

const BUTTON_CLASSES = "flex items-center justify-center w-full px-4 py-3 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
const LINK_CLASSES = "text-blue-500 hover:underline"

export default function SignIn() {
    const router = useRouter()

    const handleSignIn = async () => {
        const result = await signIn("google", { callbackUrl: "/" })
        if (result?.error) {
            console.error(result.error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
                <div className="flex justify-center mb-8">
                    <FaPassport className="text-6xl text-blue-500" />
                </div>
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
                    {SIGNIN_TEXT.WELCOME}
                </h1>
                <p className="mb-8 text-center text-gray-600">
                    {SIGNIN_TEXT.SUBTITLE}
                </p>
                <button onClick={handleSignIn} className={BUTTON_CLASSES}>
                    <FcGoogle className="mr-2 text-2xl" />
                    {SIGNIN_TEXT.GOOGLE_SIGNIN}
                </button>
                <p className="mt-8 text-sm text-center text-gray-500">
                    {SIGNIN_TEXT.AGREEMENT_PREFIX}{" "}
                    <a href="#" className={LINK_CLASSES}>
                        {SIGNIN_TEXT.TERMS}
                    </a>{" "}
                    {SIGNIN_TEXT.AND}{" "}
                    <a href="#" className={LINK_CLASSES}>
                        {SIGNIN_TEXT.PRIVACY}
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}