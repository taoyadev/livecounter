'use client'

import { useEffect } from 'react'

// Core Web Vitals monitoring component
export function WebVitals() {
  useEffect(() => {
    // Only run in production and browser environment
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return
    }

    // Check if performance APIs are available
    if (!('performance' in window) || !('PerformanceObserver' in window)) {
      console.warn('Performance APIs not supported')
      return
    }

    // Track Largest Contentful Paint (LCP)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const lcp = entry.startTime
          console.log('LCP:', lcp, 'ms')

          // Send to analytics (replace with your analytics service)
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lcp),
              custom_parameter_1: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs_improvement' : 'poor'
            })
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('Failed to observe LCP:', error)
    }

    // Track First Input Delay (FID)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime
          console.log('FID:', fid, 'ms')

          // Send to analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(fid),
              custom_parameter_1: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
            })
          }
        }
      }).observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('Failed to observe FID:', error)
    }

    // Track Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent user input
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            console.log('CLS:', clsValue)

            // Send to analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'CLS',
                value: Math.round(clsValue * 1000), // Convert to avoid float precision issues
                custom_parameter_1: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
              })
            }
          }
        }
      }).observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('Failed to observe CLS:', error)
    }

    // Track Time to First Byte (TTFB)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const navigationEntry = entry as PerformanceNavigationTiming
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
          console.log('TTFB:', ttfb, 'ms')

          // Send to analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'TTFB',
              value: Math.round(ttfb),
              custom_parameter_1: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs_improvement' : 'poor'
            })
          }
        }
      }).observe({ entryTypes: ['navigation'] })
    } catch (error) {
      console.warn('Failed to observe TTFB:', error)
    }

    // Track First Contentful Paint (FCP)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fcp = entry.startTime
          console.log('FCP:', fcp, 'ms')

          // Send to analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'FCP',
              value: Math.round(fcp),
              custom_parameter_1: fcp < 1800 ? 'good' : fcp < 3000 ? 'needs_improvement' : 'poor'
            })
          }
        }
      }).observe({ entryTypes: ['paint'] })
    } catch (error) {
      console.warn('Failed to observe FCP:', error)
    }

    // Track Interaction to Next Paint (INP) - if supported
    try {
      if ('PerformanceEventTiming' in window) {
        let longestInteraction = 0
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const interaction = (entry as any).processingEnd - entry.startTime
            if (interaction > longestInteraction) {
              longestInteraction = interaction
              console.log('INP:', longestInteraction, 'ms')

              // Send to analytics
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  name: 'INP',
                  value: Math.round(longestInteraction),
                  custom_parameter_1: longestInteraction < 200 ? 'good' : longestInteraction < 500 ? 'needs_improvement' : 'poor'
                })
              }
            }
          }
        }).observe({ entryTypes: ['event'] })
      }
    } catch (error) {
      console.warn('Failed to observe INP:', error)
    }

    // Performance resource timing for external resources
    try {
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter((resource: any) =>
        resource.duration > 1000 &&
        (resource.initiatorType === 'link' || resource.initiatorType === 'script' || resource.initiatorType === 'img')
      )

      if (slowResources.length > 0) {
        console.warn('Slow resources detected:', slowResources)

        // Send to analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'performance_issue', {
            event_category: 'Core Web Vitals',
            event_label: 'Slow Resources',
            value: slowResources.length
          })
        }
      }
    } catch (error) {
      console.warn('Failed to analyze resource timing:', error)
    }

  }, [])

  // This component doesn't render anything visible
  return null
}

// Performance optimization suggestions based on Core Web Vitals
export function getPerformanceOptimizations() {
  return {
    lcp: [
      'Optimize images with next/image and proper sizing',
      'Use font-display: swap for web fonts',
      'Minimize server response times',
      'Remove unused CSS and JavaScript',
      'Use efficient cache policies'
    ],
    fid: [
      'Break up long tasks into smaller ones',
      'Use web workers for heavy computations',
      'Defer non-critical JavaScript',
      'Minimize main thread work',
      'Use code splitting and lazy loading'
    ],
    cls: [
      'Set size attributes on images and videos',
      'Reserve space for ads and embeds',
      'Avoid inserting content above existing content',
      'Use CSS transform instead of changing layout properties',
      'Preload fonts to prevent FOIT/FOUT'
    ],
    ttfb: [
      'Optimize server configuration',
      'Use CDN for static assets',
      'Implement efficient caching strategies',
      'Optimize database queries',
      'Use HTTP/2 and HTTP/3'
    ]
  }
}