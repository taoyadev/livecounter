'use client'

// Instagram Profile Analytics Page
// Real-time Instagram profile data viewer

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, FollowerCounter } from '@/components/counter-display'
import { apiClient, useApiCall } from '@/lib/api-client'
import { Instagram, Search, User, CheckCircle, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { InstagramProfile } from '@/types/api'

export default function InstagramProfilePage() {
  const [username, setUsername] = useState('')
  const [searchUsername, setSearchUsername] = useState('')

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchUsername ? apiClient.getInstagramProfile(searchUsername) : Promise.resolve({ data: null, error: null, isLoading: false }),
    [searchUsername]
  )

  const handleSearch = () => {
    if (username.trim()) {
      setSearchUsername(username.trim().replace('@', ''))
    }
  }

  const handleExampleSearch = (exampleUsername: string) => {
    setUsername(exampleUsername)
    setSearchUsername(exampleUsername)
  }

  const profile = data as InstagramProfile | null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-gray-900 dark:to-pink-950">
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
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Instagram Profile Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time Instagram profile statistics including followers, posts, and verification status.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Instagram Profile
            </CardTitle>
            <CardDescription>
              Enter an Instagram username to view real-time profile analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Instagram Username</Label>
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
                {['instagram', 'cristiano', 'therock', 'arianagrande'].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleSearch(example)}
                  >
                    @{example}
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
      {(profile || error || isLoading) && (
        <section className="container mx-auto px-4 py-8">
          {error && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center text-red-800 dark:text-red-200">
                  <p className="font-medium">❌ Error loading profile</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Button onClick={refetch} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {profile && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Profile Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={profile.avatarHD || profile.avatar}
                        alt={`@${profile.username}`}
                        className="w-20 h-20 rounded-full border-4 border-purple-200"
                      />
                      {profile.isVerified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold">@{profile.username}</h2>
                        {profile.isVerified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Verified
                          </Badge>
                        )}
                        {profile.isBusinessAccount && (
                          <Badge variant="outline">Business</Badge>
                        )}
                        {profile.isProfessionalAccount && (
                          <Badge variant="outline">Professional</Badge>
                        )}
                      </div>
                      {profile.biography && (
                        <p className="text-muted-foreground mb-2">{profile.biography}</p>
                      )}
                      {profile.externalUrl && (
                        <a
                          href={profile.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {profile.externalUrl}
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <FollowerCounter
                  count={profile.counts?.followers}
                  platform="instagram"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Following"
                  value={profile.counts?.following}
                  format="number"
                  icon="users"
                  platform="instagram"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Posts"
                  value={profile.counts?.posts}
                  format="number"
                  icon="message"
                  platform="instagram"
                  isLoading={isLoading}
                />
              </div>

              {/* Profile Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profile ID:</span>
                        <span className="font-mono">{profile.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Type:</span>
                        <span>
                          {profile.isBusinessAccount ? 'Business' :
                           profile.isProfessionalAccount ? 'Professional' : 'Personal'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Privacy:</span>
                        <span>{profile.isPrivate ? 'Private' : 'Public'}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified:</span>
                        <span>{profile.isVerified ? '✅ Yes' : '❌ No'}</span>
                      </div>
                      {profile.businessCategoryName && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span>{profile.businessCategoryName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts Preview */}
              {profile.posts && profile.posts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>
                      Latest posts from @{profile.username}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {profile.posts.slice(0, 6).map((post, index) => (
                        <div key={post.id || index} className="aspect-square">
                          {post.thumbnail && (
                            <img
                              src={post.thumbnail}
                              alt={`Post ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

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