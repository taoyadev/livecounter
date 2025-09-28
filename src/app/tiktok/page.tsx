// TikTok Hub Page
// Directory page for TikTok tools

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Video, ArrowRight, Activity, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export default function TikTokPage() {
  const tools = [
    {
      title: 'Profile Analytics',
      description: 'Get detailed TikTok profile statistics including followers, hearts, videos count, and verification status.',
      href: '/tiktok/profile',
      icon: User,
      status: 'stable',
      features: [
        'Follower count tracking',
        'Heart count analytics',
        'Video count metrics',
        'Verification badge status',
        'Profile bio and links'
      ]
    },
    {
      title: 'Video Analytics',
      description: 'Analyze individual TikTok videos for plays, likes, shares, and comments.',
      href: '/tiktok/video',
      icon: Video,
      status: 'limited',
      features: [
        'Play count tracking',
        'Like analytics',
        'Share metrics',
        'Comment count',
        'Video metadata'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-r from-black to-red-500">
              <TikTokIcon className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-red-600 to-red-500 bg-clip-text text-transparent">
              TikTok Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time TikTok metrics and analytics tools. Track profiles, videos, and engagement data.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-black to-red-500 text-white">
              🎵 Short-Form Video Platform
            </Badge>
            <Badge variant="outline">
              2 Tools Available
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground">TikTok</span>
        </div>
      </nav>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            const isStable = tool.status === 'stable'

            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-black to-red-500">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {isStable ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">Stable</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-600 font-medium">Limited</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Features
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Notice */}
                  {!isStable && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ This API may be unstable. Data will show "n/a" if the service is unavailable.
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link href={tool.href} className="block">
                    <Button
                      className={`w-full group ${
                        isStable
                          ? 'bg-gradient-to-r from-black to-red-500 hover:from-gray-800 hover:to-red-600'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                    >
                      {isStable ? 'Try Now' : 'Try (Limited)'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-red-50 dark:from-gray-950 dark:to-red-950">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Activity className="h-5 w-5" />
              TikTok API Status
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
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Profile</Badge>
                    <span className="text-muted-foreground">Real-time profile data</span>
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
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Videos</Badge>
                    <span className="text-muted-foreground">May show "n/a"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Pro Tip:</strong> TikTok Profile API includes both stats and statsV2 for the most accurate follower and heart counts.
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