// SEO utility functions and constants
// Following E-E-A-T methodology and Core Web Vitals optimization

export const SEO_CONFIG = {
  // Base URL configuration
  baseUrl: 'https://livecounter.com',
  siteName: 'LiveCounter',
  defaultTitle: 'LiveCounter - Real-Time Social Media Analytics',
  defaultDescription: 'Professional real-time social media analytics platform. Track YouTube subscribers, TikTok followers, and Instagram metrics instantly.',

  // Organization information for E-E-A-T
  organization: {
    name: 'LiveCounter',
    url: 'https://livecounter.com',
    logo: 'https://livecounter.com/logo.png',
    foundingDate: '2024',
    description: 'Professional real-time social media analytics platform for content creators and marketers',
    contactPoint: {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'availableLanguage': 'English'
    },
    sameAs: [
      'https://twitter.com/livecounter',
      'https://github.com/livecounter'
    ],
    knowsAbout: [
      'Social Media Analytics',
      'YouTube Analytics',
      'TikTok Analytics',
      'Instagram Analytics',
      'Real-time Data Tracking',
      'Content Creator Tools'
    ]
  },

  // Default social media images
  socialImages: {
    og: '/og-image.png',
    twitter: '/twitter-card.png',
    width: 1200,
    height: 630
  },

  // Keywords by category for better targeting
  keywords: {
    general: [
      'social media analytics',
      'live subscriber count',
      'real-time analytics',
      'social media tracker',
      'live count',
      'content creator tools',
      'social metrics',
      'engagement tracking',
      'follower growth',
      'social media monitoring'
    ],
    youtube: [
      'YouTube analytics',
      'YouTube subscriber counter',
      'YouTube video analytics',
      'live subscriber count',
      'YouTube channel stats',
      'video view counter',
      'YouTube metrics',
      'channel analytics',
      'YouTube tracking tools',
      'video engagement stats',
      'YouTube live count',
      'creator analytics'
    ],
    tiktok: [
      'TikTok analytics',
      'TikTok follower tracker',
      'TikTok video analytics',
      'TikTok metrics',
      'TikTok engagement',
      'TikTok stats',
      'TikTok counter',
      'TikTok growth tracking',
      'TikTok profile analytics'
    ],
    instagram: [
      'Instagram analytics',
      'Instagram follower counter',
      'Instagram metrics',
      'Instagram engagement',
      'Instagram stats',
      'Instagram tracking',
      'Instagram growth',
      'Instagram post analytics'
    ]
  }
}

// Generate slug from title (following SEO best practices)
export function generateSlug(title: string): string {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
    'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
    'that', 'the', 'to', 'was', 'will', 'with'
  ])

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2)
    .slice(0, 6) // Keep it concise
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60) // Max 60 characters
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string, dateCreated?: string, helpful?: number}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
        'dateCreated': faq.dateCreated || new Date().toISOString(),
        'upvoteCount': faq.helpful || 0
      }
    }))
  }
}

// Generate WebApplication structured data
export function generateWebApplicationStructuredData(config: {
  name: string
  url: string
  description: string
  features: string[]
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': config.name,
    'url': config.url,
    'applicationCategory': config.category || 'Analytics',
    'operatingSystem': 'Web Browser',
    'description': config.description,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'featureList': config.features,
    'publisher': {
      '@type': 'Organization',
      'name': SEO_CONFIG.organization.name
    }
  }
}

// Generate Service structured data
export function generateServiceStructuredData(config: {
  name: string
  description: string
  serviceType: string
  audience?: string
  offers?: Array<{name: string, description: string}>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': config.name,
    'description': config.description,
    'provider': {
      '@type': 'Organization',
      'name': SEO_CONFIG.organization.name
    },
    'serviceType': config.serviceType,
    'areaServed': {
      '@type': 'Country',
      'name': 'United States'
    },
    'audience': config.audience ? {
      '@type': 'Audience',
      'audienceType': config.audience
    } : undefined,
    'category': 'Social Media Analytics',
    'hasOfferCatalog': config.offers ? {
      '@type': 'OfferCatalog',
      'name': `${config.name} Tools`,
      'itemListElement': config.offers.map(offer => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': offer.name,
          'description': offer.description
        }
      }))
    } : undefined
  }
}

// Generate optimized meta tags for platforms
export function generatePlatformMetadata(platform: 'youtube' | 'tiktok' | 'instagram', config?: {
  title?: string
  description?: string
  additionalKeywords?: string[]
}) {
  const platformConfig = {
    youtube: {
      title: config?.title || 'YouTube Analytics Tools - Live Subscriber Counter & Video Stats | LiveCounter',
      description: config?.description || 'Professional YouTube analytics tools. Track subscriber count, video views, channel stats, and engagement metrics in real-time. Free YouTube counter and analytics for content creators.',
      keywords: [...SEO_CONFIG.keywords.youtube, ...(config?.additionalKeywords || [])],
      ogImage: '/og-youtube.png',
      twitterImage: '/twitter-youtube.png'
    },
    tiktok: {
      title: config?.title || 'TikTok Analytics Tools - Follower Counter & Video Stats | LiveCounter',
      description: config?.description || 'Professional TikTok analytics tools. Track follower count, video views, engagement metrics in real-time. Free TikTok counter and analytics for content creators.',
      keywords: [...SEO_CONFIG.keywords.tiktok, ...(config?.additionalKeywords || [])],
      ogImage: '/og-tiktok.png',
      twitterImage: '/twitter-tiktok.png'
    },
    instagram: {
      title: config?.title || 'Instagram Analytics Tools - Follower Counter & Post Stats | LiveCounter',
      description: config?.description || 'Professional Instagram analytics tools. Track follower count, post engagement, story metrics in real-time. Free Instagram counter and analytics for content creators.',
      keywords: [...SEO_CONFIG.keywords.instagram, ...(config?.additionalKeywords || [])],
      ogImage: '/og-instagram.png',
      twitterImage: '/twitter-instagram.png'
    }
  }

  const platformData = platformConfig[platform]

  return {
    title: platformData.title,
    description: platformData.description,
    keywords: platformData.keywords,
    openGraph: {
      title: platformData.title,
      description: platformData.description,
      type: 'website' as const,
      locale: 'en_US',
      url: `${SEO_CONFIG.baseUrl}/${platform}`,
      images: [
        {
          url: platformData.ogImage,
          width: SEO_CONFIG.socialImages.width,
          height: SEO_CONFIG.socialImages.height,
          alt: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Analytics Tools - LiveCounter`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: platformData.title,
      description: platformData.description,
      images: [platformData.twitterImage],
    },
    alternates: {
      canonical: `${SEO_CONFIG.baseUrl}/${platform}`,
    },
    other: {
      'article:author': 'LiveCounter Team',
      'article:publisher': 'LiveCounter',
      'og:image:alt': `${platform.charAt(0).toUpperCase() + platform.slice(1)} Analytics Tools - Real-time tracking for creators`,
    },
  }
}

// Performance monitoring utilities
export function initWebVitalsTracking() {
  if (typeof window !== 'undefined' && 'performance' in window && 'PerformanceObserver' in window) {
    // Core Web Vitals tracking script (non-blocking)
    const script = `
      // Track Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          // Send to analytics service
        }
      }).observe({entryTypes: ['largest-contentful-paint']});

      // Track First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Send to analytics service
        }
      }).observe({entryTypes: ['first-input']});

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
            // Send to analytics service
          }
        }
      }).observe({entryTypes: ['layout-shift']});

      // Track Time to First Byte (TTFB)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('TTFB:', entry.responseStart - entry.requestStart);
          // Send to analytics service
        }
      }).observe({entryTypes: ['navigation']});
    `

    // Execute script asynchronously
    const scriptElement = document.createElement('script')
    scriptElement.textContent = script
    document.head.appendChild(scriptElement)
  }
}

// Content quality assessment (E-E-A-T signals)
export function assessContentQuality(content: string) {
  return {
    firstHandExperience: /I (tested|tried|used)|we (tested|built|created)/i.test(content),
    technicalDepth: content.length > 500, // Basic depth check
    authorCredentials: /author|expert|team/i.test(content),
    recentUpdates: true, // Would check actual update dates
    citations: (content.match(/https?:\/\/[^\s]+/g) || []).length,
    helpfulSignals: /tutorial|guide|how to|step by step/i.test(content)
  }
}