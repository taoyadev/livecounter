// Instagram Hub Page
// Directory page for Instagram tools

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Instagram, User, Image, ArrowRight, Activity, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function InstagramPage() {
  const tools = [
    {
      title: 'Profile Analytics',
      description: 'Get detailed Instagram profile statistics including followers, following, posts count, and verification status.',
      href: '/instagram/profile',
      icon: User,
      status: 'stable',
      features: [
        'Follower count tracking',
        'Post count analytics',
        'Verification badge status',
        'Profile metadata',
        'Bio and external links'
      ]
    },
    {
      title: 'Post Analytics',
      description: 'Analyze individual Instagram posts for likes, comments, and engagement metrics.',
      href: '/instagram/post',
      icon: Image,
      status: 'limited',
      features: [
        'Like count tracking',
        'Comment analytics',
        'Post metadata',
        'Engagement metrics',
        'Media information'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-gray-900 dark:to-pink-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Instagram className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instagram Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time Instagram metrics and analytics tools. Track profiles, posts, and engagement data.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              📸 Photo & Video Platform
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
          <span className="text-foreground">Instagram</span>
        </div>
      </nav>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            const isStable = tool.status === 'stable'

            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
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
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
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
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
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
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Activity className="h-5 w-5" />
              Instagram API Status
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
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Posts</Badge>
                    <span className="text-muted-foreground">May show "n/a"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Pro Tip:</strong> When APIs are unavailable, the interface shows "n/a" instead of mock data to ensure authenticity.
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