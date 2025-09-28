'use client'

// YouTube Video Search Page
// Search YouTube videos and display results

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, ViewCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Youtube, Search, Video, ArrowLeft, ExternalLink, Loader2, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import type { YoutubeVideoSearchResult } from '@/types/api'

export default function YouTubeVideoSearchPage() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchQuery ? apiClient.searchYoutubeVideos(searchQuery) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchQuery]
  )

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query.trim())
    }
  }

  const handleExampleSearch = (exampleQuery: string) => {
    setQuery(exampleQuery)
    setSearchQuery(exampleQuery)
  }

  const results = data as YoutubeVideoSearchResult[] | null

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-red-950 dark:via-gray-900 dark:to-red-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/youtube">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to YouTube Hub
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
              <Youtube className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            YouTube Video Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search YouTube videos by keywords and get detailed video information including views, duration, and channel data.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search YouTube Videos
            </CardTitle>
            <CardDescription>
              Enter keywords to search for YouTube videos and view analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="query">Search Keywords</Label>
              <div className="flex gap-2">
                <Input
                  id="query"
                  placeholder="Enter search keywords (e.g., 'coding tutorial', 'music video')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={!query.trim() || isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Example Searches */}
            <div className="space-y-2">
              <Label>Try these examples:</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  'coding tutorial',
                  'music video',
                  'javascript tutorial',
                  'react hooks',
                  'funny cats'
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleSearch(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge className="bg-green-100 text-green-800">
                ✅ Stable API - Real-time data
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Results Section */}
      {(results || error || isLoading) && (
        <section className="container mx-auto px-4 py-8">
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center text-red-800 dark:text-red-200">
                  <p className="font-medium">❌ Error searching videos</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Button onClick={refetch} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {results && results.length > 0 && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Search Results Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                <p className="text-muted-foreground">
                  Found {results.length} videos for "{searchQuery}"
                </p>
              </div>

              {/* Video Results Grid */}
              <div className="grid gap-6">
                {results.map((video, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="md:flex">
                      {/* Video Thumbnail */}
                      <div className="md:w-80 md:flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>

                      {/* Video Information */}
                      <div className="flex-1 p-6">
                        <div className="space-y-4">
                          {/* Title and Duration */}
                          <div>
                            <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                              {video.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {video.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {video.publishDate}
                              </div>
                            </div>
                          </div>

                          {/* Channel Info */}
                          <div className="flex items-center gap-3">
                            <img
                              src={video.channel.avatar}
                              alt={video.channel.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{video.channel.name}</p>
                              <p className="text-xs text-muted-foreground">@{video.channel.username}</p>
                            </div>
                          </div>

                          {/* View Count */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {video.viewCount?.toLocaleString() || 'n/a'} views
                              </span>
                            </div>
                            <a
                              href={video.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Watch on YouTube
                            </a>
                          </div>

                          {/* Description */}
                          {video.description && (
                            <div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {video.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Refresh Button */}
              <div className="text-center">
                <Button onClick={refetch} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    'Refresh Results'
                  )}
                </Button>
              </div>
            </div>
          )}

          {results && results.length === 0 && !isLoading && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <p className="font-medium">No videos found</p>
                  <p className="text-sm mt-1">Try different keywords or check your spelling</p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </div>
  )
}