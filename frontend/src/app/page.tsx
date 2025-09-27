"use client"

import { useAuth } from "@/lib/auth-context"
import { AuthLanding } from "@/components/auth-landing"
import { MainNavigation } from "@/components/main-navigation"

export default function HomePage() {
  const { user, signOut, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthLanding />
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation user={user} onSignOut={signOut} />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-serif font-bold mb-4">Welcome back, {user.name}!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore virtual pandals, join community discussions, and connect with your spiritual community
          </p>
          <div className="text-6xl mb-4">🙏</div>
          <p className="text-muted-foreground">Your spiritual journey continues here...</p>
        </div>
      </div>
    </div>
  )
}
