import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { NewLandingPage } from "./components/NewLandingPage";
import { ScrollFeed } from "./components/ScrollFeed";
import { SpaceDetail } from "./components/SpaceDetail";
import { MurtikarProfile } from "./components/MurtikarProfile";
import { SamitiProfile } from "./components/SamitiProfile";
import { PujariProfile } from "./components/PujariProfile";
import { AdministratorProfile } from "./components/AdministratorProfile";
import { ArtistProfile } from "./components/ArtistProfile";
import { Artists } from "./components/Artists";
import { VirtualWorship } from "./components/VirtualWorship";
import { LiveEventDetail } from "./components/LiveEventDetail";
import { EventDetail } from "./components/EventDetail";
import { LiveStreaming } from "./components/LiveStreaming";
import { CommunityForum } from "./components/CommunityForum";
import { ContentLibrary } from "./components/ContentLibrary";
import { Explore } from "./components/Explore";
import { Navigation } from "./components/Navigation";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { MapView } from "./components/MapView";
import { MurtikarDashboard } from "./components/dashboards/MurtikarDashboard";
import { SamitiDashboard } from "./components/dashboards/SamitiDashboard";
import { CommonUserDashboard } from "./components/dashboards/CommonUserDashboard";
import { AdministratorDashboard } from "./components/dashboards/AdministratorDashboard";
import { CommonUserProfile } from "./components/profiles/CommonUserProfile";
import { MurtikarUserProfile } from "./components/profiles/MurtikarUserProfile";
import { SamitiUserProfile } from "./components/profiles/SamitiUserProfile";
import { AdministratorUserProfile } from "./components/profiles/AdministratorUserProfile";
import { Settings } from "./components/Settings";
import { TeamCommunication } from "./components/TeamCommunication";
import { ManageSpace } from "./components/ManageSpace";
import { CreateProject } from "./components/CreateProject";
import { CreateEvent } from "./components/CreateEvent";
import { ManageVolunteers } from "./components/ManageVolunteers";
import { ViewDonations } from "./components/ViewDonations";
import { Footer } from "./components/Footer";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  function AppRoutes() {
    const navigate = useNavigate();

    const onNavigate = (route) => {
      if (!route) return;
      navigate(route);
    };

    return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar always visible */}
        <Navigation
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="flex-1 pt-16 overflow-x-hidden">
          <Routes>
            {/* Public / Landing Pages */}
            <Route
              path="/"
              element={
                <NewLandingPage
                  onSelectSpace={setSelectedSpace}
                  onNavigate={onNavigate}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/feed"
              element={
                <ScrollFeed
                  onNavigate={onNavigate}
                  onSelectSpace={setSelectedSpace}
                  onSelectProfile={setSelectedProfile}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore
                  onSelectSpace={setSelectedSpace}
                />
              }
            />
            <Route
              path="/artists"
              element={
                <Artists
                  onNavigate={onNavigate}
                  onSelectProfile={setSelectedProfile}
                />
              }
            />
            <Route
              path="/map"
              element={
                <MapView
                  onSelectSpace={setSelectedSpace}
                />
              }
            />
            <Route
              path="/virtual-worship"
              element={
                <VirtualWorship 
                  onNavigate={onNavigate}
                  onSelectSpace={setSelectedSpace}
                  onSelectEvent={setSelectedEvent}
                />
              }
            />
            <Route
              path="/live-event/:id"
              element={
                <LiveEventDetail 
                  event={selectedEvent}
                  space={selectedSpace}
                />
              }
            />
            <Route
              path="/event/:id"
              element={
                <EventDetail 
                  event={selectedEvent}
                  space={selectedSpace}
                />
              }
            />
            <Route
              path="/space/:id"
              element={
                <SpaceDetail 
                  space={selectedSpace}
                  onNavigate={onNavigate}
                  onSelectProfile={setSelectedProfile}
                />
              }
            />
            <Route
              path="/live-streaming"
              element={<LiveStreaming />}
            />
            <Route
              path="/community"
              element={<CommunityForum />}
            />
            <Route
              path="/library"
              element={<ContentLibrary />}
            />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  currentUser?.type === "murtikar" ? (
                    <MurtikarDashboard
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  ) : [
                      "virtual-temple",
                      "temple",
                      "church",
                      "mosque",
                      "gurudwara",
                      "buddhist-center",
                    ].includes(currentUser?.type) ? (
                    <AdministratorDashboard
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  ) : (
                    <CommonUserDashboard
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Profile Routes */}
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  currentUser?.type === "murtikar" ? (
                    <MurtikarUserProfile
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  ) : [
                      "virtual-temple",
                      "temple",
                      "church",
                      "mosque",
                      "gurudwara",
                      "buddhist-center",
                    ].includes(currentUser?.type) ? (
                    <AdministratorUserProfile
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  ) : (
                    <CommonUserProfile
                      currentUser={currentUser}
                      onNavigate={onNavigate}
                    />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Profile Pages */}

            {/* Profile Pages */}
            <Route
              path="/murtikar/:id"
              element={
                <MurtikarProfile
                  profile={selectedProfile}
                  onNavigate={onNavigate}
                />
              }
            />
            <Route
              path="/samiti/:id"
              element={
                <SamitiProfile
                  profile={selectedProfile}
                  onNavigate={onNavigate}
                />
              }
            />
            <Route
              path="/pujari/:id"
              element={
                <PujariProfile
                  profile={selectedProfile}
                  onNavigate={onNavigate}
                />
              }
            />
            <Route
              path="/administrator/:id"
              element={
                <AdministratorProfile
                  profile={selectedProfile}
                  onNavigate={onNavigate}
                />
              }
            />
            <Route
              path="/artist/:id"
              element={
                <ArtistProfile
                  profile={selectedProfile}
                  onNavigate={onNavigate}
                />
              }
            />

            {/* Management Routes */}
            <Route
              path="/manage-space"
              element={
                isAuthenticated &&
                [
                  "virtual-temple",
                  "temple",
                  "church",
                  "mosque",
                  "gurudwara",
                  "buddhist-center",
                ].includes(currentUser?.type) ? (
                  <ManageSpace
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/create-project"
              element={
                isAuthenticated &&
                currentUser?.type === "murtikar" ? (
                  <CreateProject
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/create-event"
              element={
                isAuthenticated &&
                [
                  "virtual-temple",
                  "temple",
                  "church",
                  "mosque",
                  "gurudwara",
                  "buddhist-center",
                ].includes(currentUser?.type) ? (
                  <CreateEvent
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/manage-volunteers"
              element={
                isAuthenticated &&
                [
                  "virtual-temple",
                  "temple",
                  "church",
                  "mosque",
                  "gurudwara",
                  "buddhist-center",
                ].includes(currentUser?.type) ? (
                  <ManageVolunteers
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/donations"
              element={
                isAuthenticated &&
                [
                  "virtual-temple",
                  "temple",
                  "church",
                  "mosque",
                  "gurudwara",
                  "buddhist-center",
                ].includes(currentUser?.type) ? (
                  <ViewDonations
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/team-communication"
              element={
                isAuthenticated &&
                [
                  "virtual-temple",
                  "temple",
                  "church",
                  "mosque",
                  "gurudwara",
                  "buddhist-center",
                ].includes(currentUser?.type) ? (
                  <TeamCommunication
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings
                    currentUser={currentUser}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/murtikar-user-profile"
              element={
                <MurtikarUserProfile
                  currentUser={currentUser}
                  onNavigate={onNavigate}
                />
              }
            />

            {/* Redirect any unmatched route to landing page */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup onLogin={handleLogin} />}
          />

          {/* Protected / App Routes */}
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}