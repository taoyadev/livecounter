import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://livecounter.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protect API endpoints
          '/admin/',         // Protect admin routes
          '/private/',       // Protect private routes
          '/_next/',         // Next.js internal files
          '/tmp/',           // Temporary files
          '/temp/',          // Temporary files
          '/*.json$',        // JSON files
          '/*.xml$',         // XML files (except sitemap)
          '/search?*',       // Dynamic search pages with parameters
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
        ],
        // Allow Google to access important resources
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
        ],
        crawlDelay: 2,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Block aggressive crawlers and scrapers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'SplitSignalBot',
          'YandexBot',
          'CCBot',
          'ChatGPT-User',
          'GPTBot',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: '/',
      },
      // Allow specific SEO tools for monitoring
      {
        userAgent: [
          'Screaming Frog SEO Spider',
          'SiteAuditBot',
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 5,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  }
}