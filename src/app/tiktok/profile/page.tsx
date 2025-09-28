'use client'

// TikTok Profile Analytics Page
// Real-time TikTok profile data viewer

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CounterDisplay, FollowerCounter, LikeCounter } from '@/components/counter-display'
import { apiClient, useApiCall, formatDate } from '@/lib/api-client'
import { Search, User, CheckCircle, ArrowLeft, ExternalLink, Loader2, Clock } from 'lucide-react'
import Link from 'next/link'
import type { TiktokProfile } from '@/types/api'

// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export default function TikTokProfilePage() {
  const [username, setUsername] = useState('')
  const [searchUsername, setSearchUsername] = useState('')

  // API call hook
  const { data, error, isLoading, refetch } = useApiCall(
    () => searchUsername ? apiClient.getTiktokProfile(searchUsername) : Promise.resolve({ data: null, error: null, isLoading: false }),
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

  const profile = data as TiktokProfile | null

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
            TikTok Profile Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time TikTok profile statistics including followers, hearts, videos, and verification status.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search TikTok Profile
            </CardTitle>
            <CardDescription>
              Enter a TikTok username to view real-time profile analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">TikTok Username</Label>
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
                {['chris', 'charlidamelio', 'khaby.lame', 'bellapoarch'].map((example) => (
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
                        src={profile.user.avatarLarger || profile.user.avatarMedium}
                        alt={`@${profile.user.uniqueId}`}
                        className="w-20 h-20 rounded-full border-4 border-red-200"
                      />
                      {profile.user.verified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold">@{profile.user.uniqueId}</h2>
                        {profile.user.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Verified
                          </Badge>
                        )}
                        {profile.user.isOrganization && (
                          <Badge variant="outline">Organization</Badge>
                        )}
                      </div>

                      <h3 className="text-lg text-muted-foreground mb-2">{profile.user.nickname}</h3>

                      {profile.user.signature && (
                        <p className="text-muted-foreground mb-2">{profile.user.signature}</p>
                      )}

                      {profile.user.bioLink && (
                        <a
                          href={profile.user.bioLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {profile.user.bioLink}
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Analytics Grid - Using statsV2 for more accurate data */}
              <div className="grid md:grid-cols-4 gap-6">
                <FollowerCounter
                  count={profile.statsV2.followerCount}
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Following"
                  value={profile.statsV2.followingCount}
                  format="number"
                  icon="users"
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <LikeCounter
                  count={profile.statsV2.heartCount}
                  platform="tiktok"
                  isLoading={isLoading}
                />

                <CounterDisplay
                  title="Videos"
                  value={profile.statsV2.videoCount}
                  format="number"
                  icon="trending"
                  platform="tiktok"
                  isLoading={isLoading}
                />
              </div>

              {/* Stats Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistics Comparison</CardTitle>
                  <CardDescription>
                    Comparing stats vs statsV2 from TikTok API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-blue-600">Stats (Legacy)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Followers:</span>
                          <span>{profile.stats.followerCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hearts:</span>
                          <span>{profile.stats.heartCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Videos:</span>
                          <span>{profile.stats.videoCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-green-600">StatsV2 (Current)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Followers:</span>
                          <span>{profile.statsV2.followerCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hearts:</span>
                          <span>{profile.statsV2.heartCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Videos:</span>
                          <span>{profile.statsV2.videoCount?.toLocaleString() || 'n/a'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                        <span className="font-mono">{profile.user.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Created:</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(new Date(profile.user.createTime * 1000).toISOString())}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified:</span>
                        <span>{profile.user.verified ? '✅ Yes' : '❌ No'}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Organization:</span>
                        <span>{profile.user.isOrganization ? '✅ Yes' : '❌ No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Embed Allowed:</span>
                        <span>{profile.user.isEmbedBanned ? '❌ No' : '✅ Yes'}</span>
                      </div>
                      {profile.user.roomId && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Live Room:</span>
                          <span>{profile.user.roomId}</span>
                        </div>
                      )}
                    </div>
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