// LiveCounter.com - API Type Definitions
// Based on recorded schemas from social-api.amzapi.io

// ========== Instagram Types ==========

export interface InstagramProfile {
  id: string
  username: string
  avatar: string
  avatarHD: string
  biography: string
  externalUrl: string | null
  businessCategoryName: string
  isVerified: boolean
  isBusinessAccount: boolean
  isProfessionalAccount: boolean
  isPrivate: boolean
  counts: {
    followers: number
    following: number
    posts: number
  }
  posts: InstagramPost[]
}

export interface InstagramPost {
  id: string | null
  shortcode: string | null
  caption: string | null
  likesCount: number | null
  commentsCount: number | null
  thumbnail: string | null
}

// ========== TikTok Types ==========

export interface TiktokProfile {
  user: {
    id: string
    uniqueId: string
    nickname: string
    avatarLarger: string
    avatarMedium: string
    avatarThumb: string
    createTime: number
    verified: boolean
    signature: string
    isEmbedBanned: boolean
    isOrganization: boolean
    followingVisibility: number
    roomId: string
    bioLink: string
  }
  stats: {
    followerCount: number
    followingCount: number
    heart: number
    heartCount: number
    videoCount: number
  }
  statsV2: {
    followerCount: number
    followingCount: number
    heart: number
    heartCount: number
    videoCount: number
  }
}

export interface TiktokVideo {
  id: string | null
  description: string | null
  playCount: number | null
  shareCount: number | null
  commentCount: number | null
  likeCount: number | null
  createTime: number | null
}

// ========== YouTube Types ==========

export interface YoutubeChannel {
  id: string | null
  name: string | null
  username: string | null
  avatar: string | null
  subscriberCount: string | null
  videoCount: string | null
  viewCount: string | null
  description: string | null
}

export interface YoutubeVideo {
  id: string
  title: string
  description: string | null
  thumbnail: string
  videoUrl: string
  viewCount: string
  likesCount: string
  publishDate: string
  channel: {
    id: string
    name: string
    username: string
    avatar: string
  }
}

export interface YoutubeSearchVideoResult {
  id: string
  title: string
  thumbnail: string
  duration: string
  viewCount: string
  publishDate: string
  channel: {
    id: string
    name: string
    avatar: string
  }
}

export interface YoutubeChannelSearchResult {
  id: string | null
  name: string | null
  avatar: string | null
  subscriberCount: string | null
}

// ========== API Response Wrapper ==========

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}

// ========== API Endpoints Configuration ==========

export interface ApiEndpoint {
  name: string
  path: string
  description: string
  isStable: boolean
  platform: 'instagram' | 'tiktok' | 'youtube'
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  // Instagram
  {
    name: 'Instagram Profile',
    path: '/instagram/@{username}',
    description: 'Get Instagram user profile and posts',
    isStable: true,
    platform: 'instagram'
  },
  {
    name: 'Instagram Post',
    path: '/instagram/post/{postId}',
    description: 'Get Instagram post details',
    isStable: false,
    platform: 'instagram'
  },

  // TikTok
  {
    name: 'TikTok Profile',
    path: '/tiktok/@{username}',
    description: 'Get TikTok user profile and stats',
    isStable: true,
    platform: 'tiktok'
  },
  {
    name: 'TikTok Video',
    path: '/tiktok/@{username}/video/{videoId}',
    description: 'Get TikTok video details',
    isStable: false,
    platform: 'tiktok'
  },

  // YouTube
  {
    name: 'YouTube Channel by ID',
    path: '/youtube/channel/{id}',
    description: 'Get YouTube channel by ID',
    isStable: false,
    platform: 'youtube'
  },
  {
    name: 'YouTube Channel by Username',
    path: '/youtube/@{username}',
    description: 'Get YouTube channel by username',
    isStable: false,
    platform: 'youtube'
  },
  {
    name: 'YouTube Video',
    path: '/youtube/video/{id}',
    description: 'Get YouTube video details',
    isStable: true,
    platform: 'youtube'
  },
  {
    name: 'YouTube Search Channel',
    path: '/youtube/search/channel?query={query}',
    description: 'Search YouTube channels',
    isStable: false,
    platform: 'youtube'
  },
  {
    name: 'YouTube Search Video',
    path: '/youtube/search/video?query={query}',
    description: 'Search YouTube videos',
    isStable: true,
    platform: 'youtube'
  }
]

// ========== Utility Types ==========

export type PlatformType = 'instagram' | 'tiktok' | 'youtube'

export interface CounterDisplay {
  label: string
  value: string | number | null
  format?: 'number' | 'text' | 'date'
}

export interface PlatformStats {
  platform: PlatformType
  counters: CounterDisplay[]
}