import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebVitals } from "@/components/web-vitals";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

// SEO-optimized metadata with E-E-A-T signals
export const metadata: Metadata = {
  metadataBase: new URL('https://livecounter.com'),
  title: {
    default: "LiveCounter - Real-Time Social Media Analytics & Tracking",
    template: "%s | LiveCounter - Social Media Analytics"
  },
  description: "Professional real-time social media analytics platform. Track YouTube subscribers, TikTok followers, and Instagram metrics instantly. Free live counter tools for content creators and marketers.",
  keywords: [
    "social media analytics",
    "live subscriber count",
    "real-time analytics",
    "YouTube subscriber counter",
    "TikTok follower tracker",
    "Instagram analytics",
    "social media tracker",
    "live count",
    "content creator tools",
    "social metrics",
    "engagement tracking",
    "follower growth",
    "social media monitoring"
  ],
  authors: [{ name: "LiveCounter Team", url: "https://livecounter.com" }],
  creator: "LiveCounter",
  publisher: "LiveCounter",
  applicationName: "LiveCounter",
  generator: "Next.js",
  category: "Analytics",
  classification: "Social Media Analytics Platform",

  // Open Graph optimization for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://livecounter.com',
    siteName: 'LiveCounter',
    title: 'LiveCounter - Real-Time Social Media Analytics Platform',
    description: 'Track YouTube subscribers, TikTok followers, and Instagram metrics in real-time. Professional social media analytics tools for content creators and marketers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LiveCounter - Real-Time Social Media Analytics Platform',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@livecounter',
    creator: '@livecounter',
    title: 'LiveCounter - Real-Time Social Media Analytics',
    description: 'Track YouTube, TikTok, and Instagram metrics in real-time. Professional analytics tools for content creators.',
    images: ['/twitter-card.png'],
  },

  // Technical SEO optimization
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL and alternates
  alternates: {
    canonical: 'https://livecounter.com',
    languages: {
      'en-US': 'https://livecounter.com',
    },
  },

  // App-specific metadata
  appleWebApp: {
    capable: true,
    title: 'LiveCounter',
    statusBarStyle: 'default',
  },

  // Manifest and icons
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },

  // Additional meta tags for better SEO
  other: {
    'theme-color': '#2563eb',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'geo.region': 'US',
    'geo.placename': 'United States',
    'og:locale': 'en_US',
    'article:author': 'LiveCounter Team',
    'article:publisher': 'LiveCounter',
  },

  // Verification codes (placeholders for actual implementation)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
};

// Organization structured data for E-E-A-T
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LiveCounter",
  "url": "https://livecounter.com",
  "logo": "https://livecounter.com/logo.png",
  "description": "Professional real-time social media analytics platform for content creators and marketers",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://twitter.com/livecounter",
    "https://github.com/livecounter"
  ],
  "knowsAbout": [
    "Social Media Analytics",
    "YouTube Analytics",
    "TikTok Analytics",
    "Instagram Analytics",
    "Real-time Data Tracking",
    "Content Creator Tools"
  ]
};

// WebSite structured data for search box
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LiveCounter",
  "url": "https://livecounter.com",
  "description": "Real-time social media analytics platform",
  "publisher": {
    "@type": "Organization",
    "name": "LiveCounter"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://livecounter.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// WebApplication structured data
const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LiveCounter",
  "url": "https://livecounter.com",
  "applicationCategory": "Analytics",
  "operatingSystem": "Web Browser",
  "description": "Professional real-time social media analytics platform",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Real-time YouTube subscriber tracking",
    "TikTok follower analytics",
    "Instagram metrics monitoring",
    "Live view counting",
    "Engagement rate tracking"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationStructuredData)
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.livecounter.com" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//youtube.com" />
        <link rel="dns-prefetch" href="//tiktok.com" />
        <link rel="dns-prefetch" href="//instagram.com" />

        {/* Preload critical resources - using Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <WebVitals />
      </body>
    </html>
  );
}