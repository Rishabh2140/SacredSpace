import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Users,
  Star,
  Play,
  Camera,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ScrollFeed({
  onNavigate,
  onSelectSpace,
  onSelectProfile,
}) {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(
    new Set(),
  );

  const feedPosts = [
    {
      id: 1,
      type: "pandal",
      name: "Shree Siddhivinayak Temple",
      location: "Mumbai, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Experience divine darshan with immersive 360° virtual tour. Join thousands in prayer and devotion.",
      likes: 2847,
      comments: 156,
      shares: 89,
      rating: 4.8,
      category: "Hindu Temple",
      isLive: true,
      hasVideo: false,
      postedBy: {
        name: "Temple Committee",
        avatar: "TC",
        role: "Verified",
      },
      postedTime: "2 hours ago",
      associatedArtists: [
        {
          id: 1,
          name: 'Rajesh Kumar',
          category: 'Murtikar',
          type: 'murtikar',
          avatar: 'RK',
          rating: 4.8
        },
        {
          id: 4,
          name: 'Pandit Arun Sharma',
          category: 'Pujari',
          type: 'pujari',
          avatar: 'AS',
          rating: 4.9
        },
        {
          id: 3,
          name: 'Suresh Patel',
          category: 'Decorator',
          type: 'decorator',
          avatar: 'SP',
          rating: 4.7
        }
      ]
    },
    {
      id: 2,
      type: "gurudwara",
      name: "Bangla Sahib Gurudwara",
      location: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Join the langar seva and experience the spirit of community service. Live kirtan streaming now.",
      likes: 1923,
      comments: 87,
      shares: 156,
      rating: 4.9,
      category: "Sikh Gurudwara",
      isLive: true,
      hasVideo: true,
      postedBy: {
        name: "Gurudwara Sahib",
        avatar: "GS",
        role: "Verified",
      },
      postedTime: "4 hours ago",
      associatedArtists: [
        {
          id: 6,
          name: 'Bhai Gurpreet Singh',
          category: 'Guide',
          type: 'guide',
          avatar: 'GS',
          rating: 4.9
        },
        {
          id: 3,
          name: 'Suresh Patel',
          category: 'Decorator',
          type: 'decorator',
          avatar: 'SP',
          rating: 4.7
        }
      ]
    },
    {
      id: 3,
      type: "church",
      name: "St. Paul's Cathedral",
      location: "London, UK",
      image:
        "https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Magnificent Gothic architecture and peaceful prayer spaces. Virtual choir performance this Sunday.",
      likes: 3156,
      comments: 234,
      shares: 178,
      rating: 4.7,
      category: "Christian Church",
      isLive: false,
      hasVideo: true,
      postedBy: {
        name: "Cathedral Parish",
        avatar: "CP",
        role: "Verified",
      },
      postedTime: "6 hours ago",
      associatedArtists: [
        {
          id: 5,
          name: 'Father Michael',
          category: 'Priest',
          type: 'priest',
          avatar: 'FM',
          rating: 4.8
        },
        {
          id: 2,
          name: 'Priya Mehta',
          category: 'Designer',
          type: 'designer',
          avatar: 'PM',
          rating: 4.9
        }
      ]
    },
    {
      id: 4,
      type: "mosque",
      name: "Sultan Ahmed Mosque",
      location: "Istanbul, Turkey",
      image:
        "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Historic Blue Mosque with stunning Islamic architecture. Virtual tour showcases intricate tile work and peaceful ambiance.",
      likes: 4267,
      comments: 312,
      shares: 445,
      rating: 4.9,
      category: "Islamic Mosque",
      isLive: false,
      hasVideo: false,
      postedBy: {
        name: "Mosque Foundation",
        avatar: "MF",
        role: "Verified",
      },
      postedTime: "8 hours ago",
      associatedArtists: [
        {
          id: 8,
          name: 'Imam Abdullah',
          category: 'Guide',
          type: 'guide',
          avatar: 'IA',
          rating: 4.8
        }
      ]
    },
    {
      id: 5,
      type: "buddhist-center",
      name: "Wat Pho Buddhist Temple",
      location: "Bangkok, Thailand",
      image:
        "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Ancient wisdom and meditation practices. Join guided meditation sessions and explore sacred Buddhist teachings.",
      likes: 1875,
      comments: 94,
      shares: 67,
      rating: 4.8,
      category: "Buddhist Center",
      isLive: false,
      hasVideo: true,
      postedBy: {
        name: "Temple Monks",
        avatar: "TM",
        role: "Verified",
      },
      postedTime: "12 hours ago",
      associatedArtists: [
        {
          id: 7,
          name: 'Ravi Volunteer',
          category: 'Volunteer',
          type: 'volunteer',
          avatar: 'RV',
          rating: 4.6
        }
      ]
    },
    {
      id: 6,
      type: "temple",
      name: "Akshardham Temple",
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featuredReel: "https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Magnificent traditional architecture showcasing India's spiritual and cultural heritage. Experience divine darshan and cultural exhibitions.",
      likes: 3642,
      comments: 198,
      shares: 287,
      rating: 4.9,
      category: "Hindu Temple",
      isLive: true,
      hasVideo: false,
      postedBy: {
        name: "Temple Trust",
        avatar: "TT",
        role: "Verified",
      },
      postedTime: "1 day ago",
      associatedArtists: [
        {
          id: 1,
          name: 'Rajesh Kumar',
          category: 'Murtikar',
          type: 'murtikar',
          avatar: 'RK',
          rating: 4.8
        },
        {
          id: 4,
          name: 'Pandit Arun Sharma',
          category: 'Pujari',
          type: 'pujari',
          avatar: 'AS',
          rating: 4.9
        }
      ]
    },
  ];

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) newLiked.delete(postId);
    else newLiked.add(postId);
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(postId)) newBookmarked.delete(postId);
    else newBookmarked.add(postId);
    setBookmarkedPosts(newBookmarked);
  };

  // centralized click/selection handler
  const handleSelect = (post) => {
    console.log("post clicked:", post.id, post.type);
    try {
      onSelectSpace?.(post);
      onNavigate?.(`/space/${post.id}`);
    } catch (err) {
      console.error("error in handleSelect:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Feed Header */}
        <div className="mb-6 pt-4 mt-6 sm:mt-2 md:mt-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Sacred Spaces Feed
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover divine experiences from around the world
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            "All",
            "Hindu",
            "Sikh",
            "Christian",
            "Islamic",
            "Buddhist",
            "Live",
            "Video",
          ].map((filter) => (
            <Badge
              key={filter}
              variant={
                filter === "All" ? "default" : "secondary"
              }
              className="whitespace-nowrap cursor-pointer hover:bg-orange-100 flex-shrink-0"
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              {/* Post Header */}
              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                      {post.postedBy.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm sm:text-base truncate">
                        {post.postedBy.name}
                      </span>
                      {post.postedBy.role === "Verified" && (
                        <Badge
                          variant="secondary"
                          className="text-xs flex-shrink-0"
                        >
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {post.postedTime}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                >
                  •••
                </Button>
              </div>

              {/* Post Image/Video - clickable wrapper */}
              <div
                className="relative cursor-pointer"
                onClick={() => handleSelect(post)}
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.name}
                  className="w-full h-60 sm:h-80 object-cover"
                />

                {/* Overlay Badges */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                  {post.isLive && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </Badge>
                  )}
                  <Badge className="bg-black/60 text-white text-xs">
                    {post.category}
                  </Badge>
                </div>

                {post.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full flex items-center text-sm">
                  <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                  {post.rating}
                </div>
              </div>

              {/* Post Content */}
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">
                  {post.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">
                    {post.location}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3">
                  {post.description}
                </p>



                {/* Associated Artists/Guides */}
                {post.associatedArtists && post.associatedArtists.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-800">Artists & Guides</h4>
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      {post.associatedArtists.map((artist) => (
                        <div
                          key={artist.id}
                          className="flex-shrink-0 bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors min-w-[120px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add associated spaces to artist profile
                            const artistWithSpaces = {
                              ...artist,
                              associatedSpaces: [{ id: post.id, name: post.name, type: post.type }],
                              bio: `Professional ${artist.category.toLowerCase()} with expertise in ${artist.category.toLowerCase()} services`
                            };
                            onSelectProfile?.(artistWithSpaces);
                            switch(artist.type) {
                              case 'murtikar':
                                onNavigate?.(`/murtikar/${artist.id}`);
                                break;
                              case 'pujari':
                                onNavigate?.(`/pujari/${artist.id}`);
                                break;
                              default:
                                onNavigate?.(`/artist/${artist.id}`);
                                break;
                            }
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-xs">
                                {artist.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium truncate">{artist.name}</p>
                              <p className="text-xs text-gray-600 truncate">{artist.category}</p>
                              <div className="flex items-center mt-1">
                                <Star className="w-2 h-2 text-yellow-500 fill-current mr-1" />
                                <span className="text-xs text-gray-600">{artist.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                  <span>
                    {post.likes.toLocaleString()} likes
                  </span>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                      likedPosts.has(post.id)
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPosts.has(post.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="hidden sm:inline">
                      Like
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-600 text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      Comment
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-600 text-xs sm:text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      Share
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                      bookmarkedPosts.has(post.id)
                        ? "text-orange-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => toggleBookmark(post.id)}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedPosts.has(post.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span>Save</span>
                  </Button>
                </div>

                {/* Visit Button */}
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  onClick={() => handleSelect(post)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Visit Virtual Space
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button variant="outline" size="lg">
            Load More Sacred Spaces
          </Button>
        </div>
      </div>
    </div>
  );
}