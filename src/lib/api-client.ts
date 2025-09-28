// LiveCounter.com - API Client
// Secure API client with error handling and "n/a" fallback strategy

import type {
  InstagramProfile,
  InstagramPost,
  TiktokProfile,
  TiktokVideo,
  YoutubeChannel,
  YoutubeVideo,
  YoutubeSearchVideoResult,
  YoutubeChannelSearchResult,
  ApiResponse
} from '@/types/api'

const API_BASE_URL = '/api' // Use Next.js API routes to hide API key

// ========== Core API Client ==========

class LiveCounterAPI {
  private async fetchAPI<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)

      if (!response.ok) {
        return {
          data: null,
          error: `API Error: ${response.status} ${response.statusText}`,
          isLoading: false
        }
      }

      const data = await response.json()
      return {
        data,
        error: null,
        isLoading: false
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      }
    }
  }

  // ========== Instagram APIs ==========

  async getInstagramProfile(username: string): Promise<ApiResponse<InstagramProfile>> {
    return this.fetchAPI<InstagramProfile>(`/instagram/profile/${username}`)
  }

  async getInstagramPost(postId: string): Promise<ApiResponse<InstagramPost>> {
    return this.fetchAPI<InstagramPost>(`/instagram/post/${postId}`)
  }

  // ========== TikTok APIs ==========

  async getTiktokProfile(username: string): Promise<ApiResponse<TiktokProfile>> {
    return this.fetchAPI<TiktokProfile>(`/tiktok/profile/${username}`)
  }

  async getTiktokVideo(username: string, videoId: string): Promise<ApiResponse<TiktokVideo>> {
    return this.fetchAPI<TiktokVideo>(`/tiktok/video/${username}/${videoId}`)
  }

  // ========== YouTube APIs ==========

  async getYoutubeChannelById(channelId: string): Promise<ApiResponse<YoutubeChannel>> {
    return this.fetchAPI<YoutubeChannel>(`/youtube/channel/id/${channelId}`)
  }

  async getYoutubeChannelByUsername(username: string): Promise<ApiResponse<YoutubeChannel>> {
    return this.fetchAPI<YoutubeChannel>(`/youtube/channel/username/${username}`)
  }

  async getYoutubeVideo(videoId: string): Promise<ApiResponse<YoutubeVideo>> {
    return this.fetchAPI<YoutubeVideo>(`/youtube/video/${videoId}`)
  }

  async searchYoutubeChannels(query: string): Promise<ApiResponse<YoutubeChannelSearchResult[]>> {
    return this.fetchAPI<YoutubeChannelSearchResult[]>(`/youtube/search/channel?q=${encodeURIComponent(query)}`)
  }

  async searchYoutubeVideos(query: string): Promise<ApiResponse<YoutubeSearchVideoResult[]>> {
    return this.fetchAPI<YoutubeSearchVideoResult[]>(`/youtube/search/video?q=${encodeURIComponent(query)}`)
  }
}

// ========== Utility Functions ==========

export function formatCount(count: number | string | null): string {
  if (count === null || count === undefined) return 'n/a'

  const num = typeof count === 'string' ? parseInt(count.replace(/[^0-9]/g, '')) : count

  if (isNaN(num)) return 'n/a'

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }

  return num.toLocaleString()
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'n/a'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString // Return original if can't parse
  }
}

export function getDisplayValue(value: any, fallback: string = 'n/a'): string {
  if (value === null || value === undefined || value === '') {
    return fallback
  }
  return String(value)
}

// ========== Export API Instance ==========

export const apiClient = new LiveCounterAPI()

// ========== React Hook for API Calls ==========

import { useState, useEffect } from 'react'

export function useApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    isLoading: true
  })

  useEffect(() => {
    let isMounted = true

    setResponse(prev => ({ ...prev, isLoading: true }))

    apiCall()
      .then(result => {
        if (isMounted) {
          setResponse(result)
        }
      })
      .catch(error => {
        if (isMounted) {
          setResponse({
            data: null,
            error: error.message || 'Unknown error',
            isLoading: false
          })
        }
      })

    return () => {
      isMounted = false
    }
  }, dependencies)

  const refetch = () => {
    setResponse(prev => ({ ...prev, isLoading: true }))
    apiCall().then(setResponse)
  }

  return { ...response, refetch }
}