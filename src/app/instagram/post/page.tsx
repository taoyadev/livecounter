'use client'

// Instagram Post Analytics Page
// View Instagram post analytics (Limited API)

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, LikeCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Instagram, Search, Image, ArrowLeft, ExternalLink, Loader2, Calendar, MessageCircle, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import type { InstagramPost } from '@/types/api'

export default function InstagramPostPage() {
  const [postUrl, setPostUrl] = useState('')
  const [searchPostUrl, setSearchPostUrl] = useState('')

  // Extract post ID or shortcode from Instagram URL
  const extractPostId = (input: string): string => {
    const patterns = [
      /(?:instagram\.com\/p\/|instagram\.com\/reel\/)([A-Za-z0-9_-]+)/,
      /^[A-Za-z0-9_-]+$/ // Direct shortcode
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
    () => searchPostUrl ? apiClient.getInstagramPost(searchPostUrl) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchPostUrl]
  )

  const handleSearch = () => {
    if (postUrl.trim()) {
      const extractedId = extractPostId(postUrl.trim())
      setSearchPostUrl(extractedId)
    }
  }

  const handleExampleSearch = (examplePostId: string) => {
    setPostUrl(examplePostId)
    setSearchPostUrl(examplePostId)
  }

  const post = data as InstagramPost | null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-pink-950 dark:via-gray-900 dark:to-purple-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/instagram">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Instagram Hub
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Instagram Post Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyze Instagram posts for likes, comments, and engagement metrics. Note: This API may show limited data.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Instagram Post
            </CardTitle>
            <CardDescription>
              Enter an Instagram post URL or shortcode to view analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="postUrl">Instagram Post URL or Shortcode</Label>
              <div className="flex gap-2">
                <Input
                  id="postUrl"
                  placeholder="https://instagram.com/p/ABC123... or ABC123"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={!postUrl.trim() || isLoading}>
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
                  { id: 'C5x8gQNvK9j', title: 'Popular Post 1' },
                  { id: 'C5wLQxrOgpT', title: 'Popular Post 2' },
                  { id: 'C5vH3TKuCaL', title: 'Popular Post 3' }
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
      {(post || error || isLoading) && (
        <section className="container mx-auto px-4 py-8">
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center text-red-800 dark:text-red-200">
                  <p className="font-medium">❌ Error loading post</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Button onClick={refetch} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {post && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Post Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {post.displayUrl ? (
                        <img
                          src={post.displayUrl}
                          alt="Post media"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-pink-200"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold">Instagram Post</h2>
                        <Badge variant="outline">
                          {post.isVideo ? 'Video' : 'Photo'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.takenAtTimestamp ? formatDate(new Date(post.takenAtTimestamp * 1000).toISOString()) : 'n/a'}
                        </div>
                      </div>

                      {post.owner && (
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={post.owner.profilePicUrl || '/placeholder-avatar.png'}
                            alt={post.owner.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">@{post.owner.username}</p>
                            <p className="text-xs text-muted-foreground">{post.owner.fullName || 'n/a'}</p>
                          </div>
                        </div>
                      )}

                      <a
                        href={`https://instagram.com/p/${post.shortcode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Instagram
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <LikeCounter
                  count={post.edgeMediaPreviewLike?.count || 'n/a'}
                  platform="instagram"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Comments"
                  value={post.edgeMediaToComment?.count || 'n/a'}
                  format="number"
                  icon="message"
                  platform="instagram"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Type"
                  value={post.isVideo ? 'Video Post' : 'Photo Post'}
                  format="text"
                  icon="trending"
                  platform="instagram"
                  isLoading={isLoading}
                />
              </div>

              {/* Post Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Shortcode:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {post.shortcode || 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Post Type:</span>
                        <span className="flex items-center gap-1">
                          {post.isVideo ? (
                            <>
                              <Share2 className="h-3 w-3" />
                              Video Post
                            </>
                          ) : (
                            <>
                              <Image className="h-3 w-3" />
                              Photo Post
                            </>
                          )}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Comments Disabled:</span>
                        <span>{post.commentsDisabled ? '❌ Yes' : '✅ No'}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block mb-1">Media ID:</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {post.id || 'n/a'}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Accessibility:</span>
                        <span>{post.accessibilityCaption || 'n/a'}</span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-1">Dimensions:</span>
                        <span>
                          {post.dimensions ? `${post.dimensions.width} × ${post.dimensions.height}` : 'n/a'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {post.edgeMediaToCaption?.edges?.[0]?.node?.text && (
                    <div className="mt-6">
                      <span className="text-muted-foreground block mb-2">Caption:</span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
                        <p className="whitespace-pre-wrap line-clamp-4">
                          {post.edgeMediaToCaption.edges[0].node.text}
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
                      Instagram Post API may show "n/a" for some data. This is normal behavior when the API is unavailable.
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