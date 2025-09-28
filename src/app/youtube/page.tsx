// YouTube Hub Page
// Directory page for YouTube tools

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Youtube, Users, Video, Search, ArrowRight, Activity, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function YouTubePage() {
  const tools = [
    {
      title: 'Channel Analytics (by ID)',
      description: 'Get YouTube channel statistics using channel ID including subscribers, videos, and view counts.',
      href: '/youtube/channel-id',
      icon: Users,
      status: 'limited',
      features: [
        'Subscriber count tracking',
        'Total video count',
        'Channel view analytics',
        'Channel metadata',
        'Creation date info'
      ]
    },
    {
      title: 'Channel Analytics (by Username)',
      description: 'Get YouTube channel statistics using @username format for easy access.',
      href: '/youtube/channel-username',
      icon: Users,
      status: 'limited',
      features: [
        'Username-based lookup',
        'Subscriber analytics',
        'Video count tracking',
        'Channel information',
        'Profile data'
      ]
    },
    {
      title: 'Video Analytics',
      description: 'Analyze individual YouTube videos for views, likes, and engagement metrics.',
      href: '/youtube/video',
      icon: Video,
      status: 'stable',
      features: [
        'View count tracking',
        'Like count analytics',
        'Video metadata',
        'Channel information',
        'Publication date'
      ]
    },
    {
      title: 'Channel Search',
      description: 'Search for YouTube channels by keywords and get detailed channel information.',
      href: '/youtube/search-channel',
      icon: Search,
      status: 'limited',
      features: [
        'Keyword-based search',
        'Multiple results',
        'Channel discovery',
        'Subscriber data',
        'Channel thumbnails'
      ]
    },
    {
      title: 'Video Search',
      description: 'Search for YouTube videos by keywords and get comprehensive video data.',
      href: '/youtube/search-video',
      icon: Search,
      status: 'stable',
      features: [
        'Video search results',
        'View count data',
        'Video thumbnails',
        'Channel information',
        'Duration and metadata'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-red-950 dark:via-gray-900 dark:to-red-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-r from-red-500 to-red-600">
              <Youtube className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              YouTube Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive YouTube metrics and analytics tools. Track channels, videos, and engagement data.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              📺 Video Platform
            </Badge>
            <Badge variant="outline">
              5 Tools Available
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground">YouTube</span>
        </div>
      </nav>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            const isStable = tool.status === 'stable'

            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {isStable ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium text-xs">Stable</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-600 font-medium text-xs">Limited</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features List */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4" />
                      Features
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-500" />
                          {feature}
                        </li>
                      ))}
                      {tool.features.length > 3 && (
                        <li className="text-xs text-muted-foreground/70">
                          +{tool.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Status Notice */}
                  {!isStable && (
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        ⚠️ API may be unstable. Shows "n/a" if unavailable.
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link href={tool.href} className="block">
                    <Button
                      size="sm"
                      className={`w-full group ${
                        isStable
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                    >
                      {isStable ? 'Try Now' : 'Try (Limited)'}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* API Status Info */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Activity className="h-5 w-5" />
              YouTube API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Working APIs
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Video Analytics</Badge>
                    <span className="text-muted-foreground">Real-time video data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Video Search</Badge>
                    <span className="text-muted-foreground">Search functionality</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-yellow-600 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Limited APIs
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Channel Analytics</Badge>
                    <span className="text-muted-foreground">May show "n/a"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Channel Search</Badge>
                    <span className="text-muted-foreground">May show "n/a"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Pro Tip:</strong> Video Analytics and Video Search APIs are the most reliable for YouTube data.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Back to Home */}
      <section className="container mx-auto px-4 py-8 text-center">
        <Link href="/">
          <Button variant="outline" size="lg">
            ← Back to All Platforms
          </Button>
        </Link>
      </section>
    </div>
  )
}