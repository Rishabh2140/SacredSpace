import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Play,
  Book,
  Headphones,
  Download,
  Bookmark,
  Star,
  Clock,
  Filter,
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

export function ContentLibrary({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [bookmarkedItems, setBookmarkedItems] = useState(
    new Set([1, 3, 5]),
  );

  const categories = [
    { id: "all", name: "All Content", icon: "📚", count: 2847 },
    {
      id: "texts",
      name: "Sacred Texts",
      icon: "📖",
      count: 567,
    },
    {
      id: "audio",
      name: "Devotional Audio",
      icon: "🎵",
      count: 892,
    },
    {
      id: "video",
      name: "Sermons & Videos",
      icon: "🎥",
      count: 445,
    },
    {
      id: "mantras",
      name: "Mantras & Chants",
      icon: "🕉️",
      count: 334,
    },
    {
      id: "stories",
      name: "Spiritual Stories",
      icon: "📜",
      count: 278,
    },
    {
      id: "meditation",
      name: "Meditation Guides",
      icon: "🧘",
      count: 231,
    },
  ];

  const sacredTexts = [
    {
      id: 1,
      title: "Bhagavad Gita",
      subtitle: "Complete with Commentary",
      description:
        "The timeless dialogue between Prince Arjuna and Lord Krishna, offering profound insights into duty, righteousness, and spiritual wisdom.",
      author: "Sage Vyasa",
      translator: "Swami Prabhupada",
      language: "Sanskrit (English Translation)",
      chapters: 18,
      verses: 700,
      readTime: "8 hours",
      rating: 4.9,
      downloads: 12400,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Hindu Scripture",
    },
    {
      id: 2,
      title: "Quran Majeed",
      subtitle: "Holy Quran with Translation",
      description:
        "The final revelation of Allah, containing guidance for all aspects of life and the path to spiritual enlightenment.",
      author: "Divine Revelation",
      translator: "Abdullah Yusuf Ali",
      language: "Arabic (English Translation)",
      chapters: 114,
      verses: 6236,
      readTime: "12 hours",
      rating: 4.8,
      downloads: 8900,
      image:
        "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Islamic Scripture",
    },
    {
      id: 3,
      title: "Guru Granth Sahib",
      subtitle: "Sacred Sikh Scripture",
      description:
        "The eternal Guru of Sikhs, containing hymns and teachings of Sikh Gurus and other saints.",
      author: "Sikh Gurus & Saints",
      translator: "Sant Singh Khalsa",
      language: "Gurmukhi (English Translation)",
      chapters: 1430,
      verses: 5894,
      readTime: "15 hours",
      rating: 4.9,
      downloads: 6700,
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Sikh Scripture",
    },
  ];

  const audioContent = [
    {
      id: 1,
      title: "Morning Meditation Chants",
      artist: "Pandit Ravi Shankar",
      duration: "45 min",
      plays: 89000,
      description:
        "Peaceful chants to start your day with divine energy",
      category: "Meditation",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
    },
    {
      id: 2,
      title: "Gayatri Mantra 108 Times",
      artist: "Anuradha Paudwal",
      duration: "35 min",
      plays: 156000,
      description:
        "Sacred Gayatri Mantra recited 108 times for spiritual purification",
      category: "Mantras",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Evening Aarti Collection",
      artist: "Hariharan",
      duration: "52 min",
      plays: 234000,
      description:
        "Beautiful collection of evening prayers and aarti",
      category: "Devotional",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
    },
  ];

  const videoContent = [
    {
      id: 1,
      title: "Understanding Karma: A Complete Guide",
      speaker: "Swami Sarvapriyananda",
      duration: "1h 23m",
      views: 456000,
      description:
        "Deep dive into the concept of karma and its role in spiritual evolution",
      category: "Philosophy",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Meditation for Beginners",
      speaker: "Sister Shivani",
      duration: "45m",
      views: 892000,
      description:
        "Step-by-step guide to establish a daily meditation practice",
      category: "Meditation",
      image:
        "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
    },
  ];

  const toggleBookmark = (itemId) => {
    const newBookmarked = new Set(bookmarkedItems);
    if (newBookmarked.has(itemId)) {
      newBookmarked.delete(itemId);
    } else {
      newBookmarked.add(itemId);
    }
    setBookmarkedItems(newBookmarked);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:h-16 sm:py-0 gap-3">
            <Button
              variant="ghost"
              onClick={() => onNavigate("landing")}
              className="self-start"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                Back to Home
              </span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search spiritual content..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Categories */}
          <div className="space-y-4 lg:space-y-6 order-2 lg:order-1 lg:mt-8 xl:mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id
                          ? "default"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() =>
                        setSelectedCategory(category.id)
                      }
                    >
                      <span className="mr-2">
                        {category.icon}
                      </span>
                      <span className="flex-1 text-left">
                        {category.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Library */}
            <Card>
              <CardHeader>
                <CardTitle>My Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmarked ({bookmarkedItems.size})
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Downloaded (12)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Recently Viewed
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Authors */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Authors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Swami Vivekananda", works: 45 },
                    {
                      name: "Paramahansa Yogananda",
                      works: 32,
                    },
                    { name: "Osho", works: 67 },
                    { name: "Dalai Lama", works: 28 },
                  ].map((author, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {author.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {author.works}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 ">
            <Tabs defaultValue="texts" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="texts">
                  Sacred Texts
                </TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="bookmarked">
                  Bookmarked
                </TabsTrigger>
              </TabsList>

              <TabsContent value="texts" className="mt-6">
                <div className="space-y-6">
                  {sacredTexts.map((text) => (
                    <Card
                      key={text.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-48 relative">
                          <ImageWithFallback
                            src={text.image}
                            alt={text.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {text.title}
                              </h3>
                              <p className="text-gray-600 mb-3">
                                {text.subtitle}
                              </p>
                              <p className="text-gray-700 mb-4">
                                {text.description}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 text-sm">
                                <div>
                                  <span className="text-gray-600">
                                    Author:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {text.author}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Translator:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {text.translator}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Chapters:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {text.chapters}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Verses:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {text.verses}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                  <span className="text-sm">
                                    {text.rating}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Download className="w-4 h-4 mr-1" />
                                  <span>
                                    {text.downloads.toLocaleString()}{" "}
                                    downloads
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>
                                    {text.readTime} read
                                  </span>
                                </div>
                              </div>

                              <Badge className="mb-4">
                                {text.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                              <Book className="w-4 h-4 mr-2" />
                              Read Now
                            </Button>
                            <Button variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                toggleBookmark(text.id)
                              }
                            >
                              <Bookmark
                                className={`w-4 h-4 mr-2 ${bookmarkedItems.has(text.id) ? "fill-current" : ""}`}
                              />
                              {bookmarkedItems.has(text.id)
                                ? "Bookmarked"
                                : "Bookmark"}
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="audio" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {audioContent.map((audio) => (
                    <Card
                      key={audio.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={audio.image}
                          alt={audio.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button className="bg-white/20 hover:bg-white/30 text-white border-white">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3">
                          {audio.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">
                          {audio.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          by {audio.artist}
                        </p>
                        <p className="text-gray-700 text-sm mb-4">
                          {audio.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {audio.duration}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {audio.plays.toLocaleString()} plays
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                            {audio.rating}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                            <Headphones className="w-4 h-4 mr-2" />
                            Listen
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              toggleBookmark(audio.id)
                            }
                          >
                            <Bookmark
                              className={`w-4 h-4 ${bookmarkedItems.has(audio.id) ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoContent.map((video) => (
                    <Card
                      key={video.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={video.image}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button className="bg-white/20 hover:bg-white/30 text-white border-white">
                            <Play className="w-8 h-8" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3">
                          {video.category}
                        </Badge>
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          by {video.speaker}
                        </p>
                        <p className="text-gray-700 text-sm mb-4">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {video.views.toLocaleString()} views
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                            {video.rating}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              toggleBookmark(video.id)
                            }
                          >
                            <Bookmark
                              className={`w-4 h-4 ${bookmarkedItems.has(video.id) ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bookmarked" className="mt-6">
                <div className="text-center py-12">
                  {bookmarkedItems.size === 0 ? (
                    <div>
                      <Bookmark className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        No bookmarks yet
                      </h3>
                      <p className="text-gray-500">
                        Start bookmarking your favorite
                        spiritual content
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Your Bookmarked Content (
                        {bookmarkedItems.size} items)
                      </h3>
                      <p className="text-gray-600">
                        Your saved spiritual content will appear
                        here
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}