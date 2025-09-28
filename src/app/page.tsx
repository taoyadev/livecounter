// LiveCounter.com - Homepage
// Main landing page with platform overview

import { Metadata } from 'next'
import { PlatformCard } from '@/components/platform-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Clock, Zap, Shield, TrendingUp, Globe, ArrowRight, Sparkles, Activity, Youtube, Users, Play } from 'lucide-react'
import Link from 'next/link'

// SEO metadata for homepage
export const metadata: Metadata = {
  title: "LiveCounter - Real-Time Social Media Analytics & Live Follower Counter",
  description: "Professional real-time social media analytics platform. Track YouTube subscribers, TikTok followers, and Instagram metrics instantly. Free live counter tools for content creators and marketers worldwide.",
  keywords: [
    "live subscriber count",
    "real-time social media analytics",
    "YouTube subscriber counter",
    "TikTok follower tracker",
    "Instagram live count",
    "social media metrics",
    "content creator tools",
    "follower growth tracking",
    "engagement analytics",
    "social media monitoring"
  ],
  openGraph: {
    title: "LiveCounter - Real-Time Social Media Analytics Platform",
    description: "Track YouTube subscribers, TikTok followers, and Instagram metrics in real-time. Professional analytics tools for content creators and marketers.",
    type: "website",
    locale: "en_US",
    url: "https://livecounter.com",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "LiveCounter Homepage - Real-Time Social Media Analytics",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LiveCounter - Real-Time Social Media Analytics",
    description: "Professional real-time analytics for YouTube, TikTok, and Instagram. Track followers, views, and engagement instantly.",
    images: ["/twitter-home.png"],
  },
  alternates: {
    canonical: "https://livecounter.com",
  },
  other: {
    "article:author": "LiveCounter Team",
    "article:publisher": "LiveCounter",
    "og:image:alt": "LiveCounter - Real-Time Social Media Analytics Platform",
  },
}

// Structured data for homepage FAQ section
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is LiveCounter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LiveCounter is a professional real-time social media analytics platform that tracks YouTube subscribers, TikTok followers, and Instagram metrics instantly. It provides accurate, live data for content creators and marketers."
      }
    },
    {
      "@type": "Question",
      "name": "Is LiveCounter free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, LiveCounter offers free real-time social media analytics tools. You can track followers, views, and engagement metrics across YouTube, TikTok, and Instagram without any cost."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the real-time data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LiveCounter provides highly accurate real-time data with sub-second refresh rates. Our platform uses official APIs and advanced error handling to ensure reliable metrics tracking."
      }
    },
    {
      "@type": "Question",
      "name": "Which platforms does LiveCounter support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LiveCounter supports YouTube (subscriber and video analytics), TikTok (profile and video metrics), and Instagram (profile and post analytics). We provide comprehensive tools for each platform."
      }
    }
  ]
}

// Service structured data
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "LiveCounter Social Media Analytics",
  "description": "Real-time social media analytics and tracking service",
  "provider": {
    "@type": "Organization",
    "name": "LiveCounter"
  },
  "serviceType": "Social Media Analytics",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Social Media Analytics Tools",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "YouTube Analytics",
          "description": "Real-time YouTube subscriber and video tracking"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TikTok Analytics",
          "description": "Live TikTok follower and engagement tracking"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instagram Analytics",
          "description": "Real-time Instagram metrics and follower counting"
        }
      }
    ]
  }
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse animate-float" />
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-gradient-to-br from-purple-400/25 to-pink-600/25 rounded-full blur-3xl animate-pulse animation-delay-2000 animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-gradient-to-br from-cyan-400/25 to-blue-600/25 rounded-full blur-3xl animate-pulse animation-delay-4000 animate-float" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000 animate-float" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-float shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 border-2 border-blue-200/30 dark:border-blue-800/30 backdrop-blur-md animate-fade-in shadow-xl hover:scale-105 transition-transform duration-300">
            <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Live Social Media Analytics
            </span>
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse animation-delay-1000" />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight animate-slide-up">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-700 drop-shadow-sm">
                LiveCounter
              </span>
              <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 text-muted-foreground/90 font-medium tracking-wide">
                Real-time Analytics
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-5xl mx-auto leading-relaxed animate-slide-up animation-delay-300 font-medium">
              Track followers, views, likes, and engagement metrics across
              <span className="font-bold text-red-500 hover:text-red-400 transition-colors duration-300"> YouTube</span>,
              <span className="font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"> TikTok</span>, and
              <span className="font-bold text-purple-500 hover:text-purple-400 transition-colors duration-300"> Instagram</span> in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up animation-delay-600">
            <Button
              size="lg"
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 text-lg font-bold"
              asChild
            >
              <Link href="#platforms" className="flex items-center gap-3">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-2 border-gray-200/60 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:scale-105 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Platforms Section */}
      <section id="platforms" className="relative container mx-auto px-4 py-24 md:py-40">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border-2 border-purple-200/30 dark:border-purple-800/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300">
            <Globe className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Supported Platforms
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
              Choose Your Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Access real-time analytics for the world's most popular social media platforms.
            Track growth, engagement, and performance metrics with precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 md:gap-16 max-w-8xl mx-auto">
          <div className="animate-slide-up animation-delay-100">
            <PlatformCard
              platform="youtube"
              title="YouTube"
              description="Video platform analytics and subscriber tracking"
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
          </div>

          <div className="animate-slide-up animation-delay-300">
            <PlatformCard
              platform="tiktok"
              title="TikTok"
              description="Short-form video metrics and engagement stats"
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
          </div>

          <div className="animate-slide-up animation-delay-500">
            <PlatformCard
              platform="instagram"
              title="Instagram"
              description="Photo & video sharing stats and analytics"
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
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-40">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-2 border-green-200/30 dark:border-green-800/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Key Features
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
              Why Choose LiveCounter?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Professional-grade social media analytics with real-time updates,
            advanced security, and lightning-fast performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-cyan-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-100 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <Clock className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">Real-Time Data</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Get live updates on follower counts, views, and engagement metrics with sub-second refresh rates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-900 dark:via-yellow-950/30 dark:to-orange-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-200 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <Zap className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-yellow-600 transition-colors duration-300">Lightning Fast</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Instant loading with optimized API calls, intelligent caching, and edge computing infrastructure
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 dark:from-gray-900 dark:via-green-950/30 dark:to-emerald-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-300 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <Shield className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-green-600 transition-colors duration-300">Reliable & Secure</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Enterprise-grade security with encrypted API calls, error handling, and automatic failover systems
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-950/30 dark:to-pink-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-400 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <BarChart3 className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-purple-600 transition-colors duration-300">Multiple Metrics</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Track followers, views, likes, comments, engagement rates, and 20+ advanced analytics metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 dark:from-gray-900 dark:via-indigo-950/30 dark:to-blue-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-500 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <Globe className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-indigo-600 transition-colors duration-300">Multi-Platform</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Unified dashboard for YouTube, TikTok, and Instagram with cross-platform analytics comparison
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 dark:from-gray-900 dark:via-orange-950/30 dark:to-red-950/30 backdrop-blur-md hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-up animation-delay-600 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="relative pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <TrendingUp className="h-8 w-8 text-white drop-shadow-sm" />
              </div>
              <CardTitle className="text-2xl font-bold group-hover:text-orange-600 transition-colors duration-300">Growth Tracking</CardTitle>
              <CardDescription className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                Advanced growth analytics with trend analysis, forecasting, and performance insights over time
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* API Status Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border-2 border-blue-200/30 dark:border-blue-800/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                System Status
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
                API Status & Availability
              </span>
            </h2>
            <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Real-time status monitoring of our social media data APIs with transparent uptime reporting
            </p>
          </div>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl shadow-3xl glass-card">
            <CardContent className="p-10 md:p-16">
              <div className="grid md:grid-cols-3 gap-10 md:gap-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <h4 className="font-bold text-xl text-green-600 dark:text-green-400">Stable APIs</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Instagram Profile',
                      'TikTok Profile',
                      'YouTube Video',
                      'YouTube Video Search'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-4 text-sm group/item hover:translate-x-2 transition-transform duration-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full opacity-70 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm"></div>
                        <span className="text-muted-foreground/80 group-hover/item:text-foreground transition-colors duration-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
                    <h4 className="font-bold text-xl text-yellow-600 dark:text-yellow-400">Limited APIs</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Instagram Posts',
                      'TikTok Videos',
                      'YouTube Channels',
                      'YouTube Channel Search'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-4 text-sm group/item hover:translate-x-2 transition-transform duration-300">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-70 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm"></div>
                        <span className="text-muted-foreground/80 group-hover/item:text-foreground transition-colors duration-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                    <h4 className="font-bold text-xl text-blue-600 dark:text-blue-400">Error Handling</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Graceful fallbacks',
                      '"n/a" for failed calls',
                      'No mock data used',
                      'Real-time retry logic'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-4 text-sm group/item hover:translate-x-2 transition-transform duration-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full opacity-70 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm"></div>
                        <span className="text-muted-foreground/80 group-hover/item:text-foreground transition-colors duration-300 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-40 text-center">
        <div className="relative z-10 space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                Start Tracking Now
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium">
              Choose a platform below to start monitoring your social media metrics in real-time.
              Get instant insights and track your growth with precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <Button
              size="lg"
              className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 text-lg font-bold"
              asChild
            >
              <Link href="/youtube" className="flex items-center gap-3">
                <Youtube className="w-6 h-6" />
                YouTube Analytics
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group relative w-full sm:w-auto px-10 py-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-2 border-gray-200/60 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:scale-110 text-lg font-bold"
              asChild
            >
              <Link href="/tiktok" className="flex items-center gap-3">
                <Play className="w-6 h-6" />
                TikTok Metrics
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              size="lg"
              className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 text-lg font-bold"
              asChild
            >
              <Link href="/instagram" className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                Instagram Stats
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section for E-E-A-T */}
      <section className="relative container mx-auto px-4 py-24 md:py-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/15 to-green-500/15 border-2 border-emerald-200/30 dark:border-emerald-800/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Frequently Asked Questions
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
                Everything You Need to Know
              </span>
            </h2>
            <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Get answers to common questions about our real-time social media analytics platform
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="group border-0 bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-cyan-950/20 backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-500 glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-left text-xl font-bold">What is LiveCounter?</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground/80 leading-relaxed font-medium">
                  LiveCounter is a professional real-time social media analytics platform that tracks YouTube subscribers, TikTok followers, and Instagram metrics instantly.
                  We provide accurate, live data for content creators and marketers to monitor their social media growth and engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-0 bg-gradient-to-br from-white via-green-50/20 to-emerald-50/20 dark:from-gray-900 dark:via-green-950/20 dark:to-emerald-950/20 backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-500 glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-left text-xl font-bold">Is LiveCounter free to use?</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground/80 leading-relaxed font-medium">
                  Yes, LiveCounter offers free real-time social media analytics tools. You can track followers, views, and engagement metrics across YouTube, TikTok, and Instagram without any cost.
                  Our platform is designed to be accessible to all content creators and marketers.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-500 glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-left text-xl font-bold">How accurate is the real-time data?</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground/80 leading-relaxed font-medium">
                  LiveCounter provides highly accurate real-time data with sub-second refresh rates. Our platform uses official APIs and advanced error handling to ensure reliable metrics tracking.
                  We implement graceful fallbacks and real-time retry logic to maintain data accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-0 bg-gradient-to-br from-white via-orange-50/20 to-red-50/20 dark:from-gray-900 dark:via-orange-950/20 dark:to-red-950/20 backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-500 glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-left text-xl font-bold">Which platforms does LiveCounter support?</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground/80 leading-relaxed font-medium">
                  LiveCounter supports YouTube (subscriber and video analytics), TikTok (profile and video metrics), and Instagram (profile and post analytics).
                  We provide comprehensive tools for each platform with real-time tracking capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LiveCounter.com
              </h3>
              <p className="text-muted-foreground/80 font-medium">
                Real-time social media analytics platform
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground/70">
              <span>© 2024 LiveCounter.com</span>
              <span>•</span>
              <span>Powered by social-api.amzapi.io</span>
              <span>•</span>
              <span>Built with Next.js 14</span>
            </div>

            <div className="pt-4">
              <p className="text-xs text-muted-foreground/60 font-medium">
                Professional-grade analytics for content creators and marketers
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData)
        }}
      />
    </div>
  )
}