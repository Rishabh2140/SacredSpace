"use client"

import { useState, useEffect } from "react"
import api from "../utils/api"

const PandalManagement = ({ userRole, userId }) => {
  const [pandals, setPandals] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: { address: "", coordinates: [0, 0] },
    type: "pandal",
    festival: "",
    samiti: { name: "", admin: "", contact: "" },
    murtikar: { name: "", contact: "", experience: "" },
    pujari: { name: "", contact: "", specialization: "" },
    kathavachak: { name: "", contact: "", expertise: "" },
    events: [],
    images: [],
    virtualTour: "",
    liveStreamUrl: "",
    donationGoal: 0,
    isActive: true,
  })

  useEffect(() => {
    fetchPandals()
  }, [])

  const fetchPandals = async () => {
    try {
      const response = await api.pandalsAPI.getAll({ userId })
      setPandals(response)
    } catch (error) {
      console.error("Error fetching pandals:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.pandalsAPI.create(formData)
      setPandals([...pandals, response])
      setShowCreateForm(false)
      resetForm()
    } catch (error) {
      console.error("Error creating pandal:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      location: { address: "", coordinates: [0, 0] },
      type: "pandal",
      festival: "",
      samiti: { name: "", admin: "", contact: "" },
      murtikar: { name: "", contact: "", experience: "" },
      pujari: { name: "", contact: "", specialization: "" },
      kathavachak: { name: "", contact: "", expertise: "" },
      events: [],
      images: [],
      virtualTour: "",
      liveStreamUrl: "",
      donationGoal: 0,
      isActive: true,
    })
  }

  const addEvent = () => {
    const newEvent = {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      type: "puja",
      isLive: false,
    }
    setFormData({ ...formData, events: [...formData.events, newEvent] })
  }

  const updateEvent = (index, field, value) => {
    const updatedEvents = [...formData.events]
    updatedEvents[index][field] = value
    setFormData({ ...formData, events: updatedEvents })
  }

  const removeEvent = (index) => {
    const updatedEvents = formData.events.filter((_, i) => i !== index)
    setFormData({ ...formData, events: updatedEvents })
  }

  return (
    <div className="pandal-management p-6 bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800">Pandal Management</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
          >
            Create New Pandal
          </button>
        </div>

        {/* Existing Pandals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pandals.map((pandal) => (
            <div
              key={pandal._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-400 relative">
                {pandal.images?.[0] && (
                  <img
                    src={pandal.images[0] || "/placeholder.svg"}
                    alt={pandal.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pandal.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pandal.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pandal.name}</h3>
                <p className="text-gray-600 mb-3">{pandal.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{pandal.type}</span>
                  <span>{pandal.events?.length || 0} events</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Pandal Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Pandal</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pandal Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="pandal">Pandal</option>
                        <option value="temple">Temple</option>
                        <option value="mosque">Mosque</option>
                        <option value="church">Church</option>
                        <option value="gurudwara">Gurudwara</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.location.address}
                      onChange={(e) =>
                        setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Events Section */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blue-800">Events Schedule</h3>
                      <button
                        type="button"
                        onClick={addEvent}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Add Event
                      </button>
                    </div>

                    {formData.events.map((event, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg mb-4 border">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input
                              type="text"
                              value={event.title}
                              onChange={(e) => updateEvent(index, "title", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={event.type}
                              onChange={(e) => updateEvent(index, "type", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="puja">Puja</option>
                              <option value="katha">Katha</option>
                              <option value="aarti">Aarti</option>
                              <option value="cultural">Cultural Program</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                              type="datetime-local"
                              value={event.startTime}
                              onChange={(e) => updateEvent(index, "startTime", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <input
                              type="datetime-local"
                              value={event.endTime}
                              onChange={(e) => updateEvent(index, "endTime", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={event.isLive}
                              onChange={(e) => updateEvent(index, "isLive", e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Live Stream Available</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeEvent(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove Event
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      Create Pandal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PandalManagement
