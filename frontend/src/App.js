"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"
import PandalDetailPage from "./pages/PandalDetailPage"
import DashboardPage from "./pages/DashboardPage"
import BookingPage from "./pages/BookingPage"
import MapExplorePage from "./pages/MapExplorePage"
import AuthPage from "./pages/AuthPage"
import LiveStreamPage from "./pages/LiveStreamPage"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData, token) => {
    setUser(userData)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/map" element={<MapExplorePage />} />
            <Route path="/live" element={<LiveStreamPage />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} />
            <Route
              path="/profile/:userId"
              element={user ? <ProfilePage currentUser={user} /> : <Navigate to="/auth" />}
            />
            <Route path="/pandal/:id" element={<PandalDetailPage user={user} />} />
            <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/auth" />} />
            <Route
              path="/booking/:serviceType/:providerId"
              element={user ? <BookingPage user={user} /> : <Navigate to="/auth" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
