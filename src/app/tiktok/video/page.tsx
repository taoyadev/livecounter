'use client'

// TikTok Video Analytics Page
// View TikTok video analytics (Limited API)

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, ViewCounter, LikeCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Search, Video, ArrowLeft, ExternalLink, Loader2, Calendar, MessageCircle, Share2, Play } from 'lucide-react'
import Link from 'next/link'
import type { TiktokVideo } from '@/types/api'

// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export default function TikTokVideoPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [searchVideoUrl, setSearchVideoUrl] = useState('')

  // Extract video ID from TikTok URL
  const extractVideoId = (input: string): string => {
    const patterns = [
      /(?:tiktok\.com\/@[^\/]+\/video\/|vm\.tiktok\.com\/)([0-9]+)/,
      /^[0-9]+$/ // Direct video ID
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
    () => searchVideoUrl ? apiClient.getTiktokVideo(searchVideoUrl) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchVideoUrl]
  )

  const handleSearch = () => {
    if (videoUrl.trim()) {
      const extractedId = extractVideoId(videoUrl.trim())
      setSearchVideoUrl(extractedId)
    }
  }

  const handleExampleSearch = (exampleVideoId: string) => {
    setVideoUrl(exampleVideoId)
    setSearchVideoUrl(exampleVideoId)
  }

  const video = data as TiktokVideo | null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/tiktok">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to TikTok Hub
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-black to-red-500">
              <TikTokIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-black via-red-600 to-red-500 bg-clip-text text-transparent">
            TikTok Video Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyze TikTok videos for plays, likes, shares, and comments. Note: This API may show limited data.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search TikTok Video
            </CardTitle>
            <CardDescription>
              Enter a TikTok video URL or video ID to view analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="videoUrl">TikTok Video URL or ID</Label>
              <div className="flex gap-2">
                <Input
                  id="videoUrl"
                  placeholder="https://tiktok.com/@user/video/123... or video ID"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={!videoUrl.trim() || isLoading}>
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
                  { id: '7234567890123456789', title: 'Viral Video 1' },
                  { id: '7234567890123456790', title: 'Viral Video 2' },
                  { id: '7234567890123456791', title: 'Viral Video 3' }
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
              <Badge className="bg-yellow-100 text-yellow-800">
                ⚠️ Limited API - May show "n/a"
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
                      {video.video?.cover ? (
                        <img
                          src={video.video.cover}
                          alt="Video cover"
                          className="w-32 h-40 object-cover rounded-lg border-2 border-red-200"
                        />
                      ) : (
                        <div className="w-32 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold">TikTok Video</h2>
                        <Badge variant="outline">
                          {video.video?.duration ? `${video.video.duration}s` : 'Video'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {video.createTime ? formatDate(new Date(video.createTime * 1000).toISOString()) : 'n/a'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          ID: {video.id || 'n/a'}
                        </div>
                      </div>

                      {video.author && (
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={video.author.avatarLarger || video.author.avatarMedium}
                            alt={`@${video.author.uniqueId}`}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">@{video.author.uniqueId}</p>
                            <p className="text-xs text-muted-foreground">{video.author.nickname}</p>
                          </div>
                        </div>
                      )}

                      <a
                        href={`https://tiktok.com/@${video.author?.uniqueId}/video/${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Watch on TikTok
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <ViewCounter
                  count={video.stats?.playCount || 'n/a'}
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <LikeCounter
                  count={video.stats?.diggCount || 'n/a'}
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Comments"
                  value={video.stats?.commentCount || 'n/a'}
                  format="number"
                  icon="message"
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Shares"
                  value={video.stats?.shareCount || 'n/a'}
                  format="number"
                  icon="share"
                  platform="tiktok"
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
                          {video.id || 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Duration:</span>
                        <span className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          {video.video?.duration ? `${video.video.duration} seconds` : 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Video Quality:</span>
                        <span>
                          {video.video?.width && video.video?.height
                            ? `${video.video.width} × ${video.video.height}`
                            : 'n/a'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Created:</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {video.createTime ? formatDate(new Date(video.createTime * 1000).toISOString()) : 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Author Verified:</span>
                        <span>{video.author?.verified ? '✅ Yes' : '❌ No'}</span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Download URL:</span>
                        <span className="text-xs">
                          {video.video?.downloadAddr ? 'Available' : 'n/a'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {video.desc && (
                    <div className="mt-6">
                      <span className="text-muted-foreground block mb-2">Description:</span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
                        <p className="whitespace-pre-wrap line-clamp-4">
                          {video.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* API Status Notice */}
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
                <CardContent className="pt-6">
                  <div className="text-center text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium">⚠️ Limited API Notice</p>
                    <p className="text-sm mt-1">
                      TikTok Video API may show "n/a" for some data. This is normal behavior when the API is unavailable.
                    </p>
                  </div>
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