"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Alert, AlertDescription } from "./ui/alert"
import { ratingsAPI } from "../utils/api"

export default function RatingComponent({ targetId, targetType, user, onRatingSubmitted }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleStarClick = (starRating) => {
    setRating(starRating)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      setMessage("Please select a rating")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await ratingsAPI.create({
        target: targetId,
        targetType,
        rating,
        review: review.trim() || undefined,
      })

      if (response.success) {
        setMessage("Rating submitted successfully!")
        setRating(0)
        setReview("")
        if (onRatingSubmitted) {
          onRatingSubmitted()
        }
      } else {
        setMessage(response.message || "Failed to submit rating")
      }
    } catch (error) {
      setMessage("Error submitting rating. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <Alert variant={message.includes("successfully") ? "default" : "destructive"}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`text-2xl transition-colors ${
                    star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              Review (Optional)
            </label>
            <Textarea
              id="review"
              placeholder="Share your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || rating === 0}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
