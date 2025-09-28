'use client'

// YouTube Channel Analytics (by Username) Page
// View YouTube channel analytics using @username (Limited API)

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, FollowerCounter, ViewCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Youtube, Search, Users, ArrowLeft, ExternalLink, Loader2, Calendar, CheckCircle, AtSign } from 'lucide-react'
import Link from 'next/link'
import type { YoutubeChannel } from '@/types/api'

export default function YouTubeChannelUsernamePage() {
  const [username, setUsername] = useState('')
  const [searchUsername, setSearchUsername] = useState('')

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchUsername ? apiClient.getYoutubeChannelByUsername(searchUsername) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchUsername]
  )

  const handleSearch = () => {
    if (username.trim()) {
      // Remove @ if present
      const cleanUsername = username.trim().replace('@', '')
      setSearchUsername(cleanUsername)
    }
  }

  const handleExampleSearch = (exampleUsername: string) => {
    setUsername(exampleUsername)
    setSearchUsername(exampleUsername)
  }

  const channel = data as YoutubeChannel | null

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
            YouTube Channel Analytics (by Username)
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get YouTube channel statistics using @username format. Note: This API may show limited data.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search YouTube Channel by Username
            </CardTitle>
            <CardDescription>
              Enter a YouTube channel username (handle) to view channel analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">YouTube Username/Handle</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  placeholder="Enter username (without @)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={!username.trim() || isLoading}>
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
                  'pewdiepie',
                  'mkbhd',
                  'youtube',
                  'googledevelopers',
                  'ted'
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleSearch(example)}
                    className="text-xs"
                  >
                    @{example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
              <p className="font-medium mb-1">💡 How to find Username/Handle:</p>
              <p>1. Go to the YouTube channel page</p>
              <p>2. Look at the URL: youtube.com/@username or youtube.com/c/username</p>
              <p>3. The part after @ or /c/ is the username</p>
              <p>4. Some channels use custom URLs like youtube.com/username</p>
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
      {(channel || error || isLoading) && (
        <section className="container mx-auto px-4 py-8">
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center text-red-800 dark:text-red-200">
                  <p className="font-medium">❌ Error loading channel</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Button onClick={refetch} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {channel && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Channel Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={channel.avatar || '/placeholder-avatar.png'}
                        alt={channel.title}
                        className="w-20 h-20 rounded-full border-4 border-red-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold">{channel.title || 'n/a'}</h2>
                        {channel.verified && (
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <AtSign className="h-4 w-4" />
                          @{searchUsername}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {channel.publishedAt ? formatDate(channel.publishedAt) : 'n/a'}
                        </div>
                      </div>

                      {channel.description && (
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {channel.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        <a
                          href={`https://youtube.com/@${searchUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on YouTube
                        </a>
                        {channel.customUrl && (
                          <a
                            href={`https://youtube.com/c/${channel.customUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Custom URL
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <FollowerCounter
                  count={channel.subscriberCount || 'n/a'}
                  platform="youtube"
                  isLoading={isLoading}
                />

                <ViewCounter
                  count={channel.viewCount || 'n/a'}
                  platform="youtube"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Videos"
                  value={channel.videoCount || 'n/a'}
                  format="number"
                  icon="trending"
                  platform="youtube"
                  isLoading={isLoading}
                />
              </div>

              {/* Channel Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Username/Handle:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          @{searchUsername}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Channel ID:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {channel.id || 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Created:</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {channel.publishedAt ? formatDate(channel.publishedAt) : 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Verified:</span>
                        <span>{channel.verified ? '✅ Yes' : '❌ No'}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Country:</span>
                        <span>{channel.country || 'n/a'}</span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Custom URL:</span>
                        <span className="text-xs">
                          {channel.customUrl || 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Default Language:</span>
                        <span>{channel.defaultLanguage || 'n/a'}</span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Keywords:</span>
                        <span className="text-xs">
                          {channel.keywords || 'n/a'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {channel.description && (
                    <div className="mt-6">
                      <span className="text-muted-foreground block mb-2">Description:</span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
                        <p className="whitespace-pre-wrap line-clamp-4">
                          {channel.description}
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
                      YouTube Channel (by Username) API may show "n/a" for some data. This is normal behavior when the API is unavailable.
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