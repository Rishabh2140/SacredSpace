import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined)

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar,
          isVerified: true,
        }

        setUser(userData)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("auth_user", JSON.stringify(userData))
      }

      return {
        success: data.success,
        message: data.message,
      }
    } catch (error) {
      console.error("Sign in error:", error)
      return {
        success: false,
        message: "Network error. Please try again.",
      }
    }
  }

  const signUp = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          role: userData.role || "devotee",
        }),
      })

      const data = await response.json()

      return {
        success: data.success,
        message: data.message,
        userId: data.userId,
      }
    } catch (error) {
      console.error("Sign up error:", error)
      return {
        success: false,
        message: "Network error. Please try again.",
      }
    }
  }

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, otp }),
      })

      const data = await response.json()

      if (data.success) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar,
          isVerified: true,
        }

        setUser(userData)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("auth_user", JSON.stringify(userData))
      }

      return {
        success: data.success,
        message: data.message,
      }
    } catch (error) {
      console.error("OTP verification error:", error)
      return {
        success: false,
        message: "Network error. Please try again.",
      }
    }
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  const refreshUser = async () => {
    if (!token) return

    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        const userData = {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          avatar: data.data.profile?.avatar,
          isVerified: data.data.isVerified,
        }

        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))
      }
    } catch (error) {
      console.error("Refresh user error:", error)
    }
  }

  const value = {
    user,
    token,
    isLoading,
    signIn,
    signUp,
    verifyOTP,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
