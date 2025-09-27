import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { MessageCircle, Send, Heart, Gift, Users, Settings } from "lucide-react"

export default function StreamingChat({ streamId, isLive = true }) {
  const [messages, setMessages] = useState([
    { id: 1, user: "DevoteeRam", message: "Om Namah Shivaya 🙏", timestamp: "2 min ago", type: "message" },
    { id: 2, user: "SpiritualSeeker", message: "Beautiful aarti today", timestamp: "1 min ago", type: "message" },
    {
      id: 3,
      user: "Anonymous",
      message: "Donated ₹101 for temple maintenance",
      timestamp: "1 min ago",
      type: "donation",
      amount: 101,
    },
    {
      id: 4,
      user: "PrayerWarrior",
      message: "Please pray for my family's health",
      timestamp: "30 sec ago",
      type: "prayer",
    },
    {
      id: 5,
      user: "BlessedSoul",
      message: "Feeling blessed to witness this divine ceremony",
      timestamp: "10 sec ago",
      type: "message",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 1000) + 100)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isLive) return

    // Simulate new messages coming in
    const interval = setInterval(() => {
      const randomMessages = [
        "Har Har Mahadev 🕉️",
        "Such peaceful energy here",
        "Thank you for this beautiful stream",
        "Jai Shri Ram 🙏",
        "Feeling blessed",
        "Om Gam Ganapataye Namaha",
        "Beautiful decorations this year",
        "Sending love and prayers",
        "May Lord bless everyone",
        "Jai Mata Di 🌺",
      ]

      const randomUsers = [
        "DevotedHeart",
        "SpiritualJourney",
        "DivineBlessings",
        "PeacefulMind",
        "SacredSoul",
        "BlessedOne",
        "FaithfulServant",
        "PrayerfulHeart",
      ]

      if (Math.random() > 0.7) {
        // 30% chance of new message
        const newMsg = {
          id: Date.now(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: "now",
          type: Math.random() > 0.9 ? "donation" : Math.random() > 0.8 ? "prayer" : "message",
          amount: Math.random() > 0.9 ? Math.floor(Math.random() * 500) + 51 : undefined,
        }

        setMessages((prev) => [...prev.slice(-50), newMsg]) // Keep last 50 messages
      }

      // Update viewer count
      setViewerCount((prev) => prev + Math.floor(Math.random() * 20) - 10)
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "You",
        message: newMessage,
        timestamp: "now",
        type: "message",
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const getMessageIcon = (type) => {
    switch (type) {
      case "donation":
        return "💰"
      case "prayer":
        return "🙏"
      case "system":
        return "📢"
      default:
        return null
    }
  }

  const getMessageStyle = (type) => {
    switch (type) {
      case "donation":
        return "bg-green-50 border-l-4 border-l-green-500 pl-3"
      case "prayer":
        return "bg-blue-50 border-l-4 border-l-blue-500 pl-3"
      case "system":
        return "bg-yellow-50 border-l-4 border-l-yellow-500 pl-3"
      default:
        return ""
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Live Chat
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {viewerCount}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`space-y-1 ${getMessageStyle(msg.type || "message")}`}>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">{msg.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                {getMessageIcon(msg.type || "message") && (
                  <span className="text-sm">{getMessageIcon(msg.type || "message")}</span>
                )}
              </div>
              <div className="ml-8">
                <p className="text-sm">{msg.message}</p>
                {msg.type === "donation" && msg.amount && (
                  <Badge className="mt-1 bg-green-500 text-white text-xs">
                    <Gift className="w-3 h-3 mr-1" />₹{msg.amount}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={!isLive}
            />
            <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim() || !isLive}>
              <Send className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          {!isLive && (
            <p className="text-xs text-muted-foreground mt-2 text-center">Chat is disabled when stream is offline</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
