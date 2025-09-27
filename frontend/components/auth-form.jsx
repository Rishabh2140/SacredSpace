import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function AuthForm() {
  const navigate = useNavigate()
  const { signIn, signUp, verifyOTP } = useAuth()

  const [activeTab, setActiveTab] = useState("signin")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null) // { type: "success" | "error", text: string } | null
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [pendingUserId, setPendingUserId] = useState(null)

  // Form states
  const [signInData, setSignInData] = useState({ email: "", password: "" })
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "devotee",
  })
  const [otpCode, setOtpCode] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const result = await signIn(signInData.email, signInData.password)

    if (result?.success) {
      setMessage({ type: "success", text: result.message })
      navigate("/dashboard")
    } else {
      setMessage({ type: "error", text: result?.message || "Sign in failed" })
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Validation
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setIsLoading(false)
      return
    }

    if (signUpData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      setIsLoading(false)
      return
    }

    const result = await signUp({
      name: signUpData.name,
      email: signUpData.email,
      phone: signUpData.phone,
      password: signUpData.password,
      role: signUpData.role,
    })

    if (result?.success && result.userId) {
      setPendingUserId(result.userId)
      setShowOTPVerification(true)
      setMessage({ type: "success", text: result.message })
    } else {
      setMessage({ type: "error", text: result?.message || "Sign up failed" })
    }

    setIsLoading(false)
  }

  const handleOTPVerification = async (e) => {
    e.preventDefault()
    if (!pendingUserId) return

    setIsLoading(true)
    setMessage(null)

    const result = await verifyOTP(pendingUserId, otpCode)

    if (result?.success) {
      setMessage({ type: "success", text: result.message })
      navigate("/dashboard")
    } else {
      setMessage({ type: "error", text: result?.message || "Verification failed" })
    }

    setIsLoading(false)
  }

  if (showOTPVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full spiritual-gradient flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-serif">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to your email address. Please enter it below to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>

              {message && (
                <Alert
                  className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
                >
                  {message.type === "error" ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full spiritual-gradient border-0"
                disabled={isLoading || otpCode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setShowOTPVerification(false)
                  setPendingUserId(null)
                  setOtpCode("")
                }}
              >
                Back to Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full spiritual-gradient flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-serif">Welcome to SacredSpace</CardTitle>
          <CardDescription>Sign in to your account or create a new one to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                  />
                </div>

                {message && (
                  <Alert
                    className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
                  >
                    {message.type === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full spiritual-gradient border-0" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Role</Label>
                  <Select
                    value={signUpData.role}
                    onValueChange={(value) => setSignUpData({ ...signUpData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="devotee">Devotee</SelectItem>
                      <SelectItem value="samiti">Samiti (Committee)</SelectItem>
                      <SelectItem value="murtikar">Murtikar (Idol Maker)</SelectItem>
                      <SelectItem value="pujari">Pujari (Priest)</SelectItem>
                      <SelectItem value="kathavachak">Kathavachak (Storyteller)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                {message && (
                  <Alert
                    className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
                  >
                    {message.type === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full spiritual-gradient border-0" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
