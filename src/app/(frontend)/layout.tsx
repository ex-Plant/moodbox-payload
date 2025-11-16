import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inclusive_Sans } from 'next/font/google'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import { FooterServer } from '@/Footer/FooterServer'
import { getServerSideURL } from '@/utilities/getURL'
import { ToastContainer } from 'react-toastify'
import './globals.css'

const inclusive_Sans = Inclusive_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  console.log('layout.tsx:28 -', { isEnabled })

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

          <FooterServer />
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
