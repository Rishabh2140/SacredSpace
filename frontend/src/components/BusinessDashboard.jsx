"use client"

import { useState, useEffect } from "react"
import  api  from "../utils/api"

const BusinessDashboard = ({ userType, userId }) => {
  const [stats, setStats] = useState({})
  const [bookings, setBookings] = useState([])
  const [earnings, setEarnings] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes, earningsRes, reviewsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/bookings"),
        api.get("/dashboard/earnings"),
        api.get("/dashboard/reviews"),
      ])

      setStats(statsRes.data)
      setBookings(bookingsRes.data)
      setEarnings(earningsRes.data)
      setReviews(reviewsRes.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? "text-green-600" : "text-red-600"}`}>
              {change > 0 ? "↗" : "↘"} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )

  return (
    <div className="business-dashboard p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage your religious services and grow your business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings || 0}
            icon="📅"
            color="border-blue-500"
            change={stats.bookingChange}
          />
          <StatCard
            title="This Month Earnings"
            value={`₹${stats.monthlyEarnings || 0}`}
            icon="💰"
            color="border-green-500"
            change={stats.earningsChange}
          />
          <StatCard
            title="Average Rating"
            value={stats.averageRating || 0}
            icon="⭐"
            color="border-yellow-500"
            change={stats.ratingChange}
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects || 0}
            icon="🏗️"
            color="border-purple-500"
            change={stats.projectChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{booking.eventName}</h3>
                    <p className="text-sm text-gray-600">{booking.clientName}</p>
                    <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{booking.amount}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Reviews</h2>
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div key={review._id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{review.clientName}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Growth Tools */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Business Growth Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-gray-800 mb-2">Promote Your Services</h3>
              <p className="text-sm text-gray-600 mb-4">Get featured in search results and reach more clients</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Upgrade to Premium
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-2">Network & Collaborate</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other service providers and committees</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Join Network
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-gray-800 mb-2">Learn & Improve</h3>
              <p className="text-sm text-gray-600 mb-4">Access training resources and best practices</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                View Resources
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
              <span>📝</span>
              Update Profile
            </button>
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2">
              <span>📅</span>
              Manage Calendar
            </button>
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2">
              <span>💬</span>
              View Messages
            </button>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2">
              <span>📊</span>
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboard
