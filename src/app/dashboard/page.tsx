"use client"

import React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await getServerSession()

    if (!session) {
        redirect("/auth/signin")
    }

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <p>You are signed in as {session.user?.email}</p>
        </div>
    )
}