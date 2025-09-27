"use client"

import { useState, useEffect } from "react"
import  api  from "../utils/api"

const UserProfiles = () => {
  const [profiles, setProfiles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProfiles()
  }, [selectedCategory])

  const fetchProfiles = async () => {
    try {
      const response = await api.get(`/profiles?category=${selectedCategory}&search=${searchTerm}`)
      setProfiles(response.data)
    } catch (error) {
      console.error("Error fetching profiles:", error)
    }
  }

  const handleRating = async (profileId, rating) => {
    try {
      await api.post(`/profiles/${profileId}/rate`, { rating })
      fetchProfiles() // Refresh profiles
    } catch (error) {
      console.error("Error rating profile:", error)
    }
  }

  const handleFollow = async (profileId) => {
    try {
      await api.post(`/profiles/${profileId}/follow`)
      fetchProfiles() // Refresh profiles
    } catch (error) {
      console.error("Error following profile:", error)
    }
  }

  const categories = [
    { value: "all", label: "All Profiles", icon: "👥" },
    { value: "samiti", label: "Samiti", icon: "🏛️" },
    { value: "murtikar", label: "Murtikar", icon: "🎨" },
    { value: "pujari", label: "Pujari", icon: "🙏" },
    { value: "kathavachak", label: "Kathavachak", icon: "📖" },
  ]

  const StarRating = ({ rating, onRate, readOnly = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readOnly && onRate(star)}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } ${!readOnly ? "hover:text-yellow-500 cursor-pointer" : "cursor-default"}`}
            disabled={readOnly}
          >
            ⭐
          </button>
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</span>
      </div>
    )
  }

  return (
    <div className="user-profiles p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Service Provider Profiles</h1>
          <p className="text-gray-600">Connect with experienced religious service providers and artisans</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, location, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-colors ${
                    selectedCategory === category.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Profile Header */}
              <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="absolute -bottom-8 left-6">
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-2xl">
                      {profile.type === "samiti" && "🏛️"}
                      {profile.type === "murtikar" && "🎨"}
                      {profile.type === "pujari" && "🙏"}
                      {profile.type === "kathavachak" && "📖"}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-800 capitalize">
                    {profile.type}
                  </span>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-12 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{profile.name}</h3>
                  <p className="text-gray-600 text-sm">{profile.location}</p>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={profile.averageRating || 0} readOnly />
                  <p className="text-sm text-gray-500 mt-1">{profile.totalRatings} reviews</p>
                </div>

                {/* Specialization/Experience */}
                <div className="mb-4">
                  {profile.type === "murtikar" && (
                    <div>
                      <p className="text-sm text-gray-600">Experience: {profile.experience} years</p>
                      <p className="text-sm text-gray-600">Specializes in: {profile.specialization}</p>
                    </div>
                  )}
                  {profile.type === "pujari" && (
                    <div>
                      <p className="text-sm text-gray-600">Specialization: {profile.specialization}</p>
                      <p className="text-sm text-gray-600">Languages: {profile.languages?.join(", ")}</p>
                    </div>
                  )}
                  {profile.type === "kathavachak" && (
                    <div>
                      <p className="text-sm text-gray-600">Expertise: {profile.expertise}</p>
                      <p className="text-sm text-gray-600">Experience: {profile.experience} years</p>
                    </div>
                  )}
                  {profile.type === "samiti" && (
                    <div>
                      <p className="text-sm text-gray-600">Admin: {profile.admin}</p>
                      <p className="text-sm text-gray-600">Active Pandals: {profile.activePandals}</p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{profile.followers || 0} followers</span>
                  <span>{profile.completedProjects || 0} projects</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFollow(profile._id)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    {profile.isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm">
                    Contact
                  </button>
                </div>

                {/* Quick Rating */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Rate this service provider:</p>
                  <StarRating rating={0} onRate={(rating) => handleRating(profile._id, rating)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {profiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No profiles found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or category filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfiles
