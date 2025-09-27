import { MainNavigation } from "@/components/main-navigation"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-serif font-bold mb-4">Explore Sacred Spaces</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover pandals, temples, and religious sites from around the world
          </p>
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-muted-foreground">Interactive map and search features coming soon...</p>
        </div>
      </div>
    </div>
  )
}
