'use client'

// Counter Display Component
// Core component for displaying social media counters

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCount, getDisplayValue } from '@/lib/api-client'
import { Loader as Loader2, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react'

interface CounterDisplayProps {
  title: string
  value: string | number | null
  subtitle?: string
  format?: 'number' | 'text' | 'date'
  icon?: 'users' | 'eye' | 'heart' | 'message' | 'trending'
  isLoading?: boolean
  platform?: 'instagram' | 'tiktok' | 'youtube'
  variant?: 'default' | 'large' | 'compact'
}

const IconMap = {
  users: Users,
  eye: Eye,
  heart: Heart,
  message: MessageCircle,
  trending: TrendingUp
}

const PlatformColors = {
  instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
  tiktok: 'bg-gradient-to-r from-gray-900 via-black to-red-500',
  youtube: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
}

export function CounterDisplay({
  title,
  value,
  subtitle,
  format = 'number',
  icon,
  isLoading = false,
  platform,
  variant = 'default'
}: CounterDisplayProps) {
  const IconComponent = icon ? IconMap[icon] : null

  const formatValue = (val: string | number | null): string => {
    if (isLoading) return '...'

    switch (format) {
      case 'number':
        return formatCount(val)
      case 'date':
        return getDisplayValue(val)
      case 'text':
      default:
        return getDisplayValue(val)
    }
  }

  const cardClassName = variant === 'large'
    ? 'w-full'
    : variant === 'compact'
    ? 'w-48'
    : 'w-64'

  return (
    <Card className={`${cardClassName} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 backdrop-blur-sm`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-muted-foreground/80 flex items-center gap-2 tracking-wide">
            {IconComponent && <IconComponent className="h-4 w-4" />}
            {title}
          </CardTitle>
          {platform && (
            <Badge variant="secondary" className={`text-white text-xs font-bold ${PlatformColors[platform]} shadow-lg`}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-2xl font-bold text-muted-foreground animate-pulse">Loading...</span>
              </div>
            ) : (
              <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {formatValue(value)}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground/70 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Specialized counter components for different metrics

export function FollowerCounter({
  count,
  platform,
  isLoading
}: {
  count: number | null
  platform: 'instagram' | 'tiktok' | 'youtube'
  isLoading?: boolean
}) {
  const getLabel = () => {
    switch (platform) {
      case 'youtube': return 'Subscribers'
      case 'instagram': return 'Followers'
      case 'tiktok': return 'Followers'
      default: return 'Followers'
    }
  }

  return (
    <CounterDisplay
      title={getLabel()}
      value={count}
      format="number"
      icon="users"
      platform={platform}
      isLoading={isLoading}
    />
  )
}

export function ViewCounter({
  count,
  platform,
  isLoading
}: {
  count: string | number | null
  platform: 'instagram' | 'tiktok' | 'youtube'
  isLoading?: boolean
}) {
  return (
    <CounterDisplay
      title="Views"
      value={count}
      format="number"
      icon="eye"
      platform={platform}
      isLoading={isLoading}
    />
  )
}

export function LikeCounter({
  count,
  platform,
  isLoading
}: {
  count: string | number | null
  platform: 'instagram' | 'tiktok' | 'youtube'
  isLoading?: boolean
}) {
  const getLabel = () => {
    switch (platform) {
      case 'youtube': return 'Likes'
      case 'instagram': return 'Likes'
      case 'tiktok': return 'Hearts'
      default: return 'Likes'
    }
  }

  return (
    <CounterDisplay
      title={getLabel()}
      value={count}
      format="number"
      icon="heart"
      platform={platform}
      isLoading={isLoading}
    />
  )
}