'use client'

// Counter Display Component
// Core component for displaying social media counters

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCount, getDisplayValue } from '@/lib/api-client'
import { Loader2, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react'

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
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  tiktok: 'bg-gradient-to-r from-black to-red-500',
  youtube: 'bg-gradient-to-r from-red-500 to-red-600'
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
    <Card className={`${cardClassName} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {IconComponent && <IconComponent className="h-4 w-4" />}
            {title}
          </CardTitle>
          {platform && (
            <Badge variant="secondary" className={`text-white text-xs ${PlatformColors[platform]}`}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-2xl font-bold text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {formatValue(value)}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">
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