'use client'

// YouTube Channel Search Page
// Search YouTube channels by keywords (Limited API)

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, SubscriberCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Youtube, Search, Users, ArrowLeft, ExternalLink, Loader2, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { YoutubeChannelSearchResult } from '@/types/api'

export default function YouTubeChannelSearchPage() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchQuery ? apiClient.searchYoutubeChannels(searchQuery) : Promise.resolve({ data: null, error: null, isLoading: false }),
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

  const results = data as YoutubeChannelSearchResult[] | null

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
            YouTube Channel Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search for YouTube channels by keywords and discover new creators. Note: This API may show limited data.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search YouTube Channels
            </CardTitle>
            <CardDescription>
              Enter keywords to search for YouTube channels and view their analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="query">Search Keywords</Label>
              <div className="flex gap-2">
                <Input
                  id="query"
                  placeholder="Enter search keywords (e.g., 'gaming', 'music', 'technology')"
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
                  'gaming',
                  'music',
                  'technology',
                  'education',
                  'cooking',
                  'travel'
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
              <Badge className="bg-yellow-100 text-yellow-800">
                ⚠️ Limited API - May show "n/a"
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
                  <p className="font-medium">❌ Error searching channels</p>
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
                  Found {results.length} channels for "{searchQuery}"
                </p>
              </div>

              {/* Channel Results Grid */}
              <div className="grid gap-6">
                {results.map((channel, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="md:flex">
                      {/* Channel Avatar */}
                      <div className="md:w-40 md:flex-shrink-0 flex justify-center md:justify-start p-6 md:pr-0">
                        <img
                          src={channel.avatar || '/placeholder-avatar.png'}
                          alt={channel.title}
                          className="w-24 h-24 rounded-full border-4 border-red-200"
                        />
                      </div>

                      {/* Channel Information */}
                      <div className="flex-1 p-6 md:pt-6">
                        <div className="space-y-4">
                          {/* Title and Verification */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {channel.title || 'n/a'}
                              </h3>
                              {channel.verified && (
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {channel.subscriberCount ?
                                  `${channel.subscriberCount.toLocaleString()} subscribers` :
                                  'Subscriber count n/a'
                                }
                              </div>
                              {channel.publishedAt && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(channel.publishedAt)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          {channel.description && (
                            <div>
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {channel.description}
                              </p>
                            </div>
                          )}

                          {/* Channel Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-lg font-bold text-red-600">
                                {channel.subscriberCount?.toLocaleString() || 'n/a'}
                              </p>
                              <p className="text-xs text-muted-foreground">Subscribers</p>
                            </div>
                            <div className="text-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-lg font-bold text-red-600">
                                {channel.videoCount?.toLocaleString() || 'n/a'}
                              </p>
                              <p className="text-xs text-muted-foreground">Videos</p>
                            </div>
                            <div className="text-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg col-span-2 md:col-span-1">
                              <p className="text-lg font-bold text-red-600">
                                {channel.viewCount?.toLocaleString() || 'n/a'}
                              </p>
                              <p className="text-xs text-muted-foreground">Total Views</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3">
                            <a
                              href={channel.id ? `https://youtube.com/channel/${channel.id}` : `https://youtube.com/c/${channel.customUrl || channel.title}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Channel
                            </a>
                            {channel.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
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
                  <p className="font-medium">No channels found</p>
                  <p className="text-sm mt-1">Try different keywords or check your spelling</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Status Notice */}
          {(results || error) && (
            <Card className="max-w-4xl mx-auto border-yellow-200 bg-yellow-50 dark:bg-yellow-950 mt-8">
              <CardContent className="pt-6">
                <div className="text-center text-yellow-800 dark:text-yellow-200">
                  <p className="font-medium">⚠️ Limited API Notice</p>
                  <p className="text-sm mt-1">
                    YouTube Channel Search API may show "n/a" for some data or return limited results. This is normal behavior when the API is unavailable.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </div>
  )
}