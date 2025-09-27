import { Routes, Route } from "react-router-dom"
import  Header  from "./components/Header"
import  HomePage  from "./pages/HomePage"
import  ExplorePage  from "./pages/ExplorePage"
import  AuthPage  from "./pages/AuthPage"
import  DashboardPage  from "./pages/DashboardPage"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
