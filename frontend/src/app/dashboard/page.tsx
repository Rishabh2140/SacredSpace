"use client"

import { useAuth } from "@/lib/auth-context"
import { UserDashboard } from "@/components/user-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { SamitiDashboard } from "@/components/samiti-dashboard"
import { MurtikarDashboard } from "@/components/murtikar-dashboard"
import { PujariDashboard } from "@/components/pujari-dashboard"
import { KathavachakDashboard } from "@/components/kathavachak-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />
    case "samiti":
      return <SamitiDashboard user={user} />
    case "murtikar":
      return <MurtikarDashboard user={user} />
    case "pujari":
      return <PujariDashboard user={user} />
    case "kathavachak":
      return <KathavachakDashboard user={user} />
    case "devotee":
    default:
      return <UserDashboard user={user} />
  }
}
