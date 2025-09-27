"use client"

import { useState } from "react"
import { api } from "../utils/api"

const DonationSystem = ({ pandalId, samiti }) => {
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
  })
  const [showDonationForm, setShowDonationForm] = useState(false)

  const predefinedAmounts = [100, 500, 1000, 2500, 5000, 10000]

  const handleDonation = async (e) => {
    e.preventDefault()
    try {
      const amount = customAmount || donationAmount
      const donationData = {
        pandalId,
        amount: Number.parseInt(amount),
        donorInfo: donorInfo.isAnonymous ? { isAnonymous: true } : donorInfo,
      }

      const response = await api.post("/donations", donationData)

      // Redirect to payment gateway or show success message
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl
      } else {
        alert("Donation submitted successfully!")
        setShowDonationForm(false)
        resetForm()
      }
    } catch (error) {
      console.error("Error processing donation:", error)
      alert("Error processing donation. Please try again.")
    }
  }

  const resetForm = () => {
    setDonationAmount("")
    setCustomAmount("")
    setDonorInfo({
      name: "",
      email: "",
      phone: "",
      isAnonymous: false,
    })
  }

  return (
    <div className="donation-system">
      {!showDonationForm ? (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Support This Pandal</h3>
              <p className="text-yellow-100 mb-4">
                Your donation helps maintain this sacred space and supports the community
              </p>
              <div className="text-sm text-yellow-100">
                <p>Managed by: {samiti.name}</p>
                <p>Admin: {samiti.admin}</p>
              </div>
            </div>
            <div className="text-6xl">🙏</div>
          </div>
          <button
            onClick={() => setShowDonationForm(true)}
            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors mt-4"
          >
            Donate Now (Dan/Punya)
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Make a Donation</h3>
            <button onClick={() => setShowDonationForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <form onSubmit={handleDonation} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Donation Amount</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setDonationAmount(amount)
                      setCustomAmount("")
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      donationAmount === amount
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Or enter custom amount</label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setDonationAmount("")
                  }}
                  placeholder="Enter amount in ₹"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={donorInfo.isAnonymous}
                  onChange={(e) => setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Donate anonymously
                </label>
              </div>

              {!donorInfo.isAnonymous && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required={!donorInfo.isAnonymous}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required={!donorInfo.isAnonymous}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Donation Summary */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Donation Summary</h4>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-orange-600">₹{customAmount || donationAmount || 0}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Platform Fee (5%):</span>
                <span className="text-gray-600">₹{Math.round((customAmount || donationAmount || 0) * 0.05)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span className="text-orange-600">₹{Math.round((customAmount || donationAmount || 0) * 1.05)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowDonationForm(false)}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!(customAmount || donationAmount)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default DonationSystem
