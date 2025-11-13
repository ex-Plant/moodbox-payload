import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Geist, Inclusive_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import Footer from '@/components/_custom_moodbox/footer/Footer'
import { ToastContainer } from 'react-toastify'

const inclusive_Sans = Inclusive_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

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
        className={cn(
          ` flex min-h-screen flex-col antialiased`,
          ` relative `,
          // `[&_*]:outline [&_*]:outline-[1px] [&_*]:outline-pink-400`
        )}
      >
        <Providers>
          {/*<AdminBar*/}
          {/*  adminBarProps={{*/}
          {/*    preview: isEnabled,*/}
          {/*  }}*/}
          {/*/>*/}

          <Header />
          {children}
          <Footer />
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
