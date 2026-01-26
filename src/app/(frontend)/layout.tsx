import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inclusive_Sans } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { FooterServer } from '@/components/Footer/FooterServer'
import { getServerSideURL } from '@/utilities/getURL'
import { ToastContainer } from 'react-toastify'
import './styles/globals.css'
import './styles/consent-manager.css'
import { RootLayoutDebugWrapper } from '../../components/DebugTools/RootLayoutDebugWrapper'
import Script from 'next/script'

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
        <Script src="/vendor/silktide/consent-manager.js" strategy="afterInteractive" />
        <Script src="/vendor/silktide/config.js" strategy="afterInteractive" />
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
