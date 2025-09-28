'use client'

// Platform Card Component
// Card component for each social media platform

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

interface PlatformCardProps {
  platform: 'instagram' | 'tiktok' | 'youtube'
  title: string
  description: string
  features: string[]
  toolsCount: number
  href: string
}

const PlatformConfig = {
  instagram: {
    color: 'from-purple-500 to-pink-500',
    icon: Instagram,
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950'
  },
  tiktok: {
    color: 'from-black to-red-500',
    icon: null, // TikTok icon would need to be custom
    bgColor: 'bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-950 dark:to-red-950'
  },
  youtube: {
    color: 'from-red-500 to-red-600',
    icon: Youtube,
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900'
  }
}

// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export function PlatformCard({
  platform,
  title,
  description,
  features,
  toolsCount,
  href
}: PlatformCardProps) {
  const config = PlatformConfig[platform]
  const IconComponent = platform === 'tiktok' ? TikTokIcon : config.icon

  return (
    <Card className={`w-full max-w-sm hover:shadow-lg transition-all duration-300 ${config.bgColor}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${config.color}`}>
            {IconComponent && (
              <IconComponent className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`bg-gradient-to-r ${config.color} text-white`}>
            {toolsCount} Tools
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Available Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Link href={href} className="block">
          <Button className="w-full group">
            Explore {title} Tools
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}