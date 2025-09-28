'use client'

// YouTube Video Analytics Page
// Real-time YouTube video data viewer

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, ViewCounter, LikeCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Youtube, Search, Video, ArrowLeft, ExternalLink, Loader2, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import type { YoutubeVideo } from '@/types/api'

export default function YouTubeVideoPage() {
  const [videoId, setVideoId] = useState('')
  const [searchVideoId, setSearchVideoId] = useState('')

  // Extract video ID from YouTube URL
  const extractVideoId = (input: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^[a-zA-Z0-9_-]{11}$/ // Direct video ID
    ]

    for (const pattern of patterns) {
      const match = input.match(pattern)
      if (match) {
        return match[1] || input
      }
    }

    return input
  }

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchVideoId ? apiClient.getYoutubeVideo(searchVideoId) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchVideoId]
  )

  const handleSearch = () => {
    if (videoId.trim()) {
      const extractedId = extractVideoId(videoId.trim())
      setSearchVideoId(extractedId)
    }
  }

  const handleExampleSearch = (exampleVideoId: string) => {
    setVideoId(exampleVideoId)
    setSearchVideoId(exampleVideoId)
  }

  const video = data as YoutubeVideo | null

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
            YouTube Video Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time YouTube video statistics including views, likes, and channel information.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search YouTube Video
            </CardTitle>
            <CardDescription>
              Enter a YouTube video URL or video ID to view real-time analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="videoId">YouTube Video URL or ID</Label>
              <div className="flex gap-2">
                <Input
                  id="videoId"
                  placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={!videoId.trim() || isLoading}>
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
                  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up' },
                  { id: 'M7FIvfx5J10', title: 'Gangnam Style' },
                  { id: 'CevxZvSJLk8', title: 'Katy Perry - Roar' }
                ].map((example) => (
                  <Button
                    key={example.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleSearch(example.id)}
                    className="text-xs"
                  >
                    {example.title}
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
      {(video || error || isLoading) && (
        <section className="container mx-auto px-4 py-8">
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center text-red-800 dark:text-red-200">
                  <p className="font-medium">❌ Error loading video</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Button onClick={refetch} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {video && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Video Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-24 object-cover rounded-lg border-2 border-red-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">{video.title}</h2>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {video.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          {video.id}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={video.channel.avatar}
                          alt={video.channel.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{video.channel.name}</p>
                          <p className="text-xs text-muted-foreground">@{video.channel.username}</p>
                        </div>
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
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <ViewCounter
                  count={video.viewCount}
                  platform="youtube"
                  isLoading={isLoading}
                />

                <LikeCounter
                  count={video.likesCount}
                  platform="youtube"
                  isLoading={isLoading}
                />
              </div>

              {/* Video Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Video Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Video ID:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {video.id}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Published:</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {video.publishDate}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">URL:</span>
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 text-xs break-all"
                        >
                          {video.videoUrl}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Channel:</span>
                        <div className="flex items-center gap-2">
                          <img
                            src={video.channel.avatar}
                            alt={video.channel.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">{video.channel.name}</p>
                            <p className="text-xs text-muted-foreground">@{video.channel.username}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Channel ID:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {video.channel.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {video.description && (
                    <div className="mt-6">
                      <span className="text-muted-foreground block mb-2">Description:</span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
                        <p className="whitespace-pre-wrap line-clamp-4">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Refresh Button */}
              <div className="text-center">
                <Button onClick={refetch} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    'Refresh Data'
                  )}
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}