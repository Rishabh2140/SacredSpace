"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchParams = useSearchParams()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        {children}
        <Analytics />
        <Toaster />
      </AuthProvider>
    </Suspense>
  )
}
