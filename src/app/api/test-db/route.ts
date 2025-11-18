// app/api/test-db/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasUrl: !!process.env.POSTGRES_URL,
    urlPrefix: process.env.POSTGRES_URL?.substring(0, 30),
  })
}
