// TikTok Video API Route
// Server-side API to protect API key

import { NextRequest, NextResponse } from 'next/server'

const SOCIAL_API_BASE_URL = process.env.SOCIAL_API_BASE_URL!
const SOCIAL_API_KEY = process.env.SOCIAL_API_KEY!

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID parameter is required' },
        { status: 400 }
      )
    }

    // Call the external API with our secret key
    const response = await fetch(
      `${SOCIAL_API_BASE_URL}/tiktok/video/${encodeURIComponent(videoId)}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': SOCIAL_API_KEY
        }
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('TikTok Video API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}