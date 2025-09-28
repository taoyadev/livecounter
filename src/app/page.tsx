// LiveCounter.com - Homepage
// Main landing page with platform overview

import { PlatformCard } from '@/components/platform-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Clock, Zap, Shield, TrendingUp, Globe } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            🚀 Live Social Media Analytics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            LiveCounter.com
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time social media counters for YouTube, TikTok, and Instagram.
            Track followers, views, likes, and engagement metrics instantly.
          </p>
        </div>
      </header>

      {/* Platforms Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Platform</h2>
          <p className="text-muted-foreground">
            Access real-time analytics for the world's most popular social media platforms
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PlatformCard
            platform="youtube"
            title="YouTube"
            description="Video platform analytics"
            features={[
              'Channel subscriber count',
              'Video view tracking',
              'Channel search',
              'Video analytics',
              'Real-time metrics'
            ]}
            toolsCount={5}
            href="/youtube"
          />

          <PlatformCard
            platform="tiktok"
            title="TikTok"
            description="Short-form video metrics"
            features={[
              'Profile follower count',
              'Video engagement stats',
              'Heart count tracking',
              'Profile analytics',
              'Real-time updates'
            ]}
            toolsCount={2}
            href="/tiktok"
          />

          <PlatformCard
            platform="instagram"
            title="Instagram"
            description="Photo & video sharing stats"
            features={[
              'Profile follower tracking',
              'Post engagement metrics',
              'Likes and comments',
              'Profile analytics',
              'Real-time data'
            ]}
            toolsCount={2}
            href="/instagram"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose LiveCounter?</h2>
          <p className="text-muted-foreground">
            Professional-grade social media analytics with real-time updates
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Real-Time Data</CardTitle>
              <CardDescription>
                Get live updates on follower counts, views, and engagement metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Instant loading with optimized API calls and caching
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Reliable & Secure</CardTitle>
              <CardDescription>
                Secure API integration with error handling and fallbacks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Multiple Metrics</CardTitle>
              <CardDescription>
                Track followers, views, likes, comments, and more
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Multi-Platform</CardTitle>
              <CardDescription>
                Support for YouTube, TikTok, and Instagram in one place
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Growth Tracking</CardTitle>
              <CardDescription>
                Monitor social media growth and engagement trends
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* API Status Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">🔍 API Status & Availability</CardTitle>
            <CardDescription className="text-center">
              Current status of our social media data APIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✅ Stable APIs</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Instagram Profile</li>
                  <li>• TikTok Profile</li>
                  <li>• YouTube Video</li>
                  <li>• YouTube Video Search</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-yellow-600">⚠️ Limited APIs</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Instagram Posts</li>
                  <li>• TikTok Videos</li>
                  <li>• YouTube Channels</li>
                  <li>• YouTube Channel Search</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">📊 Error Handling</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Graceful fallbacks</li>
                  <li>• "n/a" for failed calls</li>
                  <li>• No mock data used</li>
                  <li>• Real-time retry logic</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Start Tracking Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a platform below to start monitoring your social media metrics in real-time
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/youtube">
              <Button size="lg" className="bg-red-500 hover:bg-red-600">
                YouTube Analytics
              </Button>
            </Link>
            <Link href="/tiktok">
              <Button size="lg" variant="outline">
                TikTok Metrics
              </Button>
            </Link>
            <Link href="/instagram">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Instagram Stats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-muted-foreground">
          <p>
            © 2024 LiveCounter.com - Real-time social media analytics
          </p>
          <p className="text-sm mt-2">
            Powered by social-api.amzapi.io | Built with Next.js 14
          </p>
        </div>
      </footer>
    </div>
  )
}