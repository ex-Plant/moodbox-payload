import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inclusive_Sans } from 'next/font/google'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { FooterServer } from '@/components/Footer/FooterServer'
import { getServerSideURL } from '@/utilities/getURL'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { RootLayoutDebugWrapper } from '../../components/DebugTools/RootLayoutDebugWrapper'
// import Script from 'next/script'

const inclusive_Sans = Inclusive_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(
        inclusive_Sans.variable,
        'bg-background scroll-smooth font-sans text-foreground',
      )}
      lang="pl"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {/* <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="2b038946-2a09-4077-b9eb-386fbab1255b"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="beforeInteractive"
        /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body
        className={`flex min-h-screen flex-col outline antialiased relative bg-background text-foreground`}
      >
        <Providers>
          <RootLayoutDebugWrapper>
            <Header />
            {children}
            <FooterServer />
          </RootLayoutDebugWrapper>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
