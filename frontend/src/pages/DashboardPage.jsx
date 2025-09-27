"use client"

import { useState, useEffect } from "react"
import  api from "../utils/api"
import PandalManagement from "../components/PandalManagement"
import BusinessDashboard from "../components/BusinessDashboard"
import UserProfiles from "../components/UserProfiles"

const DashboardPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recentActivity: [],
    notifications: [],
    favorites: [],
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard/overview")
      setDashboardData(response.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "pandals", label: "My Pandals", icon: "🏛️", roles: ["samiti", "admin"] },
    { id: "business", label: "Business", icon: "💼", roles: ["murtikar", "pujari", "kathavachak"] },
    { id: "profiles", label: "Service Providers", icon: "👥" },
    { id: "bookings", label: "Bookings", icon: "📅" },
    { id: "favorites", label: "Favorites", icon: "❤️" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  const filteredTabs = tabs.filter((tab) => !tab.roles || tab.roles.includes(user.role))

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="text-orange-100">
          {user.role === "samiti" && "Manage your pandals and connect with devotees"}
          {user.role === "murtikar" && "Showcase your artistry and grow your business"}
          {user.role === "pujari" && "Share your spiritual services with the community"}
          {user.role === "kathavachak" && "Inspire others with your storytelling"}
          {user.role === "user" && "Explore spiritual experiences and connect with faith"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.totalViews || 0}</p>
            </div>
            <div className="text-4xl">👁️</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Followers</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.followers || 0}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rating</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.rating || 0}</p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {user.role === "samiti" ? "Active Pandals" : user.role === "user" ? "Visited" : "Projects"}
              </p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.stats.projects || 0}</p>
            </div>
            <div className="text-4xl">🏗️</div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {dashboardData.recentActivity.length > 0 ? (
              dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{activity.icon}</div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📝</div>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
          <div className="space-y-4">
            {dashboardData.notifications.length > 0 ? (
              dashboardData.notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl">{notification.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 text-sm">Mark as read</button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔔</div>
                <p>No new notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role-specific Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.role === "samiti" && (
            <>
              <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors text-center">
                <div className="text-2xl mb-2">➕</div>
                <div className="text-sm font-medium">Add Pandal</div>
              </button>
              <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-medium">Schedule Event</div>
              </button>
            </>
          )}

          {(user.role === "murtikar" || user.role === "pujari" || user.role === "kathavachak") && (
            <>
              <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm font-medium">Update Profile</div>
              </button>
              <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm font-medium">View Bookings</div>
              </button>
            </>
          )}

          <button className="bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600 transition-colors text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-sm font-medium">Explore Map</div>
          </button>

          <button className="bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-colors text-center">
            <div className="text-2xl mb-2">❤️</div>
            <div className="text-sm font-medium">My Favorites</div>
          </button>
        </div>
      </div>
    </div>
  )

  const BookingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((booking) => (
              <div key={booking} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">Ganesh Chaturthi Puja</h3>
                    <p className="text-sm text-gray-600">Shree Ganesh Mandal, Mumbai</p>
                    <p className="text-sm text-gray-500">September 15, 2024 at 10:00 AM</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">₹5,000</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    View Details
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                    Contact Client
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const FavoritesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.favorites.length > 0 ? (
          dashboardData.favorites.map((favorite, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-400">
                <img
                  src={favorite.image || "/placeholder.svg?height=200&width=300&query=pandal"}
                  alt={favorite.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{favorite.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{favorite.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600">{favorite.rating}</span>
                  </div>
                  <button className="text-red-500 hover:text-red-700">❤️</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
            <p className="text-gray-500">Start exploring pandals and add them to your favorites</p>
          </div>
        )}
      </div>
    </div>
  )

  const SettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={user.name}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={user.phone || ""}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS Notifications</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Event Reminders</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">New Follower Alerts</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "pandals":
        return <PandalManagement userRole={user.role} userId={user._id} />
      case "business":
        return <BusinessDashboard userType={user.role} userId={user._id} />
      case "profiles":
        return <UserProfiles />
      case "bookings":
        return <BookingsTab />
      case "favorites":
        return <FavoritesTab />
      case "settings":
        return <SettingsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="dashboard-page bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-x-auto">
          <div className="flex">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default DashboardPage
