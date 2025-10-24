import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Shield,
  Globe,
  Smartphone,
  Mail,
  Moon,
  Sun,
  Volume2,
  Eye,
  Heart,
  User,
  Key,
  Database,
  Trash2,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Settings({ onNavigate, currentUser }) {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    prayerReminders: true,
    eventAlerts: true,
    communityUpdates: true,
    donationReceipts: true,

    // Privacy Settings
    profileVisibility: "public",
    showDonations: false,
    showActivity: true,
    allowMessages: true,
    showLocation: true,

    // Display Settings
    theme: "light",
    language: "english",
    timezone: "IST",
    soundEffects: true,
    animationsEnabled: true,

    // Account Settings
    twoFactorAuth: false,
    dataSharing: false,
    marketingEmails: false,
  });

  const [profileData, setProfileData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    deleteConfirmation: "",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log("Saving settings:", settings);
    // Show success message
  };

  const handleChangePassword = () => {
    if (
      profileData.newPassword !== profileData.confirmPassword
    ) {
      alert("New passwords do not match");
      return;
    }
    // In a real app, this would update password
    console.log("Password changed");
    setProfileData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleDeleteAccount = () => {
    if (profileData.deleteConfirmation !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }
    // In a real app, this would delete the account
    console.log("Account deletion confirmed");
  };

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "sanskrit", label: "संस्कृत (Sanskrit)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost">
                  ← Back to Profile
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Settings
              </h1>
            </div>
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          defaultValue="notifications"
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Display</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-600">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "emailNotifications",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-600">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "pushNotifications",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-gray-600">
                        Receive important updates via SMS
                      </p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "smsNotifications",
                          checked,
                        )
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Prayer Reminders
                      </Label>
                      <p className="text-sm text-gray-600">
                        Daily prayer and aarti reminders
                      </p>
                    </div>
                    <Switch
                      checked={settings.prayerReminders}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "prayerReminders",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Event Alerts
                      </Label>
                      <p className="text-sm text-gray-600">
                        Notifications for upcoming events
                      </p>
                    </div>
                    <Switch
                      checked={settings.eventAlerts}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "eventAlerts",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Community Updates
                      </Label>
                      <p className="text-sm text-gray-600">
                        Updates from communities you follow
                      </p>
                    </div>
                    <Switch
                      checked={settings.communityUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "communityUpdates",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Donation Receipts
                      </Label>
                      <p className="text-sm text-gray-600">
                        Email receipts for donations
                      </p>
                    </div>
                    <Switch
                      checked={settings.donationReceipts}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "donationReceipts",
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Profile Visibility
                      </Label>
                      <p className="text-sm text-gray-600">
                        Who can see your profile
                      </p>
                    </div>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) =>
                        handleSettingChange(
                          "profileVisibility",
                          value,
                        )
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          Public
                        </SelectItem>
                        <SelectItem value="friends">
                          Friends Only
                        </SelectItem>
                        <SelectItem value="private">
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Show Donations
                      </Label>
                      <p className="text-sm text-gray-600">
                        Display your donation history
                      </p>
                    </div>
                    <Switch
                      checked={settings.showDonations}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "showDonations",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Show Activity
                      </Label>
                      <p className="text-sm text-gray-600">
                        Display your recent activity
                      </p>
                    </div>
                    <Switch
                      checked={settings.showActivity}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "showActivity",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Allow Messages
                      </Label>
                      <p className="text-sm text-gray-600">
                        Let others send you messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowMessages}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "allowMessages",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Show Location
                      </Label>
                      <p className="text-sm text-gray-600">
                        Display your city/location
                      </p>
                    </div>
                    <Switch
                      checked={settings.showLocation}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "showLocation",
                          checked,
                        )
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-gray-600">
                        Add extra security to your account
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {settings.twoFactorAuth && (
                        <Badge variant="secondary">
                          Enabled
                        </Badge>
                      )}
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "twoFactorAuth",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Data Sharing
                      </Label>
                      <p className="text-sm text-gray-600">
                        Share anonymized data for platform
                        improvements
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "dataSharing",
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <span>Display & Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Theme</Label>
                      <p className="text-sm text-gray-600">
                        Choose your preferred theme
                      </p>
                    </div>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        handleSettingChange("theme", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4" />
                            <span>Light</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center space-x-2">
                            <Moon className="w-4 h-4" />
                            <span>Dark</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="auto">
                          Auto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Language
                      </Label>
                      <p className="text-sm text-gray-600">
                        Select your preferred language
                      </p>
                    </div>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        handleSettingChange("language", value)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem
                            key={lang.value}
                            value={lang.value}
                          >
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Time Zone
                      </Label>
                      <p className="text-sm text-gray-600">
                        Your local timezone for prayer times
                      </p>
                    </div>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) =>
                        handleSettingChange("timezone", value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IST">
                          IST (UTC+5:30)
                        </SelectItem>
                        <SelectItem value="EST">
                          EST (UTC-5)
                        </SelectItem>
                        <SelectItem value="PST">
                          PST (UTC-8)
                        </SelectItem>
                        <SelectItem value="GMT">
                          GMT (UTC+0)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Sound Effects
                      </Label>
                      <p className="text-sm text-gray-600">
                        Play sounds for actions and
                        notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "soundEffects",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Animations
                      </Label>
                      <p className="text-sm text-gray-600">
                        Enable smooth animations and transitions
                      </p>
                    </div>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "animationsEnabled",
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              {/* Password Change */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5 text-orange-500" />
                    <span>Change Password</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    className="w-full"
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Account Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-orange-500" />
                    <span>Account Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Marketing Emails
                      </Label>
                      <p className="text-sm text-gray-600">
                        Receive promotional content and updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "marketingEmails",
                          checked,
                        )
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <Trash2 className="w-5 h-5" />
                    <span>Danger Zone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Delete Account
                    </h4>
                    <p className="text-sm text-red-700 mb-4">
                      This action cannot be undone. Your
                      profile, donations history, and all data
                      will be permanently deleted.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <Label
                          htmlFor="delete-confirmation"
                          className="text-red-700"
                        >
                          Type "DELETE" to confirm account
                          deletion
                        </Label>
                        <Input
                          id="delete-confirmation"
                          value={profileData.deleteConfirmation}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              deleteConfirmation:
                                e.target.value,
                            }))
                          }
                          placeholder="Type DELETE here"
                          className="border-red-300"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={
                          profileData.deleteConfirmation !==
                          "DELETE"
                        }
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account Permanently
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}