import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Pin,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CommunityForum({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const trendingTopics = [
    { tag: "Diwali2024", posts: 1234, trending: true },
    { tag: "VirtualDarshan", posts: 892, trending: true },
    { tag: "TempleVisit", posts: 567, trending: false },
    { tag: "SpiritualGuidance", posts: 445, trending: true },
    { tag: "FestivalPreparation", posts: 334, trending: false },
  ];

  const communities = [
    {
      id: 1,
      name: "Hindu Dharma",
      members: 12400,
      icon: "🕉️",
      description:
        "Discussions about Hindu philosophy, rituals, and practices",
      isJoined: true,
    },
    {
      id: 2,
      name: "Sikh Sangat",
      members: 8900,
      icon: "☬",
      description:
        "Sikh community for Gurbani, seva, and spiritual growth",
      isJoined: false,
    },
    {
      id: 3,
      name: "Christian Fellowship",
      members: 7600,
      icon: "✝️",
      description: "Faith-based discussions and prayer support",
      isJoined: true,
    },
    {
      id: 4,
      name: "Islamic Ummah",
      members: 6800,
      icon: "☪️",
      description:
        "Islamic teachings, Quran study, and community support",
      isJoined: false,
    },
    {
      id: 5,
      name: "Buddhist Sangha",
      members: 4500,
      icon: "☸️",
      description:
        "Meditation, Buddhist teachings, and mindfulness practices",
      isJoined: true,
    },
    {
      id: 6,
      name: "Jain Community",
      members: 3200,
      icon: "🕯️",
      description:
        "Jain principles, non-violence, and spiritual practices",
      isJoined: false,
    },
  ];

  const discussions = [
    {
      id: 1,
      title: "How to prepare for Diwali celebrations at home?",
      author: "SpiritualSeeker",
      authorAvatar: "SS",
      community: "Hindu Dharma",
      communityIcon: "🕉️",
      content:
        "Looking for guidance on traditional Diwali preparations, especially for someone celebrating alone this year...",
      likes: 234,
      replies: 67,
      views: 1890,
      timeAgo: "2 hours ago",
      tags: ["Diwali2024", "Celebration", "Traditions"],
      isPinned: false,
      isAnswered: true,
    },
    {
      id: 2,
      title:
        "Virtual Darshan vs Physical Temple Visit - Your Thoughts?",
      author: "DevoteeRam",
      authorAvatar: "DR",
      community: "Hindu Dharma",
      communityIcon: "🕉️",
      content:
        "With technology advancing, many temples now offer virtual darshan. What are your experiences and thoughts on this?",
      likes: 189,
      replies: 89,
      views: 2340,
      timeAgo: "4 hours ago",
      tags: ["VirtualDarshan", "Technology", "Spirituality"],
      isPinned: true,
      isAnswered: false,
    },
    {
      id: 3,
      title: "Best meditation practices for beginners?",
      author: "PeacefulMind",
      authorAvatar: "PM",
      community: "Buddhist Sangha",
      communityIcon: "☸️",
      content:
        "I'm new to meditation and looking for guidance on where to start. Any recommendations for techniques or apps?",
      likes: 156,
      replies: 43,
      views: 987,
      timeAgo: "6 hours ago",
      tags: ["Meditation", "Beginner", "Mindfulness"],
      isPinned: false,
      isAnswered: true,
    },
    {
      id: 4,
      title: "Planning a community Langar - Need advice",
      author: "SevaHeart",
      authorAvatar: "SH",
      community: "Sikh Sangat",
      communityIcon: "☬",
      content:
        "Our local community wants to organize a langar. Looking for experienced organizers to share their wisdom...",
      likes: 98,
      replies: 25,
      views: 654,
      timeAgo: "8 hours ago",
      tags: ["Langar", "Community", "Seva"],
      isPinned: false,
      isAnswered: false,
    },
    {
      id: 5,
      title: "Understanding the significance of Friday prayers",
      author: "FaithfulMuslim",
      authorAvatar: "FM",
      community: "Islamic Ummah",
      communityIcon: "☪️",
      content:
        "Can someone explain the deeper spiritual significance of Jummah prayers and community gathering?",
      likes: 134,
      replies: 52,
      views: 1123,
      timeAgo: "12 hours ago",
      tags: ["Jummah", "Prayer", "Community"],
      isPinned: false,
      isAnswered: true,
    },
  ];

  const featuredQA = [
    {
      id: 1,
      question:
        "What is the significance of lighting diyas during Diwali?",
      answer:
        "Diyas represent the victory of light over darkness, knowledge over ignorance...",
      expert: "Pandit Sharma",
      likes: 567,
      category: "Hindu Dharma",
    },
    {
      id: 2,
      question:
        "How to maintain spiritual practice during busy times?",
      answer:
        "Start with small, consistent practices. Even 5 minutes of daily meditation...",
      expert: "Monk Tenzin",
      likes: 423,
      category: "Buddhist Sangha",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:h-16 sm:py-0 gap-3">
            <Link to="/">
              <Button variant="ghost" className="self-start">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  Back to Home
                </span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <Tabs defaultValue="discussions" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discussions">
                  All Discussions
                </TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
                <TabsTrigger value="trending">
                  Trending
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="mt-6">
                {/* Filter Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    <div className="flex space-x-2">
                      {[
                        "All",
                        "Unanswered",
                        "Popular",
                        "Recent",
                      ].map((filter) => (
                        <Badge
                          key={filter}
                          variant={
                            filter === "All"
                              ? "default"
                              : "secondary"
                          }
                          className="cursor-pointer hover:bg-orange-100"
                        >
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {discussions.length} discussions
                  </span>
                </div>

                {/* Discussions List */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {discussion.authorAvatar}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  {discussion.isPinned && (
                                    <Pin className="w-4 h-4 text-orange-500" />
                                  )}
                                  <h3 className="font-semibold text-lg text-gray-900">
                                    {discussion.title}
                                  </h3>
                                  {discussion.isAnswered && (
                                    <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                                      ✓ Answered
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                                  <span className="font-medium">
                                    {discussion.author}
                                  </span>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <span className="mr-1">
                                      {discussion.communityIcon}
                                    </span>
                                    <span>
                                      {discussion.community}
                                    </span>
                                  </div>
                                  <span>•</span>
                                  <span>
                                    {discussion.timeAgo}
                                  </span>
                                </div>

                                <p className="text-gray-700 mb-4">
                                  {discussion.content}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  {discussion.tags.map(
                                    (tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        #{tag}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-red-500"
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  {discussion.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-blue-500"
                                >
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {discussion.replies}
                                </Button>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {discussion.views}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="qa" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    Featured Q&A
                  </h3>
                  {featuredQA.map((qa) => (
                    <Card
                      key={qa.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            Q
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">
                              {qa.question}
                            </h4>
                            <p className="text-gray-700 mb-3">
                              {qa.answer}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <span>
                                  Answered by{" "}
                                  <strong>{qa.expert}</strong>
                                </span>
                                <Badge variant="secondary">
                                  {qa.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  {qa.likes}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                    Trending Topics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trendingTopics.map((topic, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            <span className="text-lg font-semibold">
                              #{topic.tag}
                            </span>
                            {topic.trending && (
                              <TrendingUp className="w-4 h-4 ml-2 text-orange-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {topic.posts} posts
                          </p>
                          {topic.trending && (
                            <Badge className="mt-2 bg-orange-500 hover:bg-orange-600">
                              Trending
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:mt-8 xl:mt-12">
            {/* Communities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Communities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communities.map((community) => (
                    <div
                      key={community.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {community.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            {community.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {community.members.toLocaleString()}{" "}
                            members
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          community.isJoined
                            ? "default"
                            : "outline"
                        }
                        className={
                          community.isJoined
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {community.isJoined ? "Joined" : "Join"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>
                      Be respectful of all faiths and beliefs
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>
                      Share knowledge and seek guidance humbly
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>No hate speech or discrimination</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>
                      Keep discussions constructive and positive
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Meditation",
                    "Prayer",
                    "Festivals",
                    "Rituals",
                    "Philosophy",
                    "Community",
                    "Spirituality",
                    "Guidance",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Active Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "SpiritualSeeker",
                      posts: 156,
                      avatar: "SS",
                    },
                    {
                      name: "DevoteeRam",
                      posts: 134,
                      avatar: "DR",
                    },
                    {
                      name: "PeacefulMind",
                      posts: 98,
                      avatar: "PM",
                    },
                    {
                      name: "SevaHeart",
                      posts: 87,
                      avatar: "SH",
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {user.posts} contributions
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}