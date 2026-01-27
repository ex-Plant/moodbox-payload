import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inclusive_Sans } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header/Component'
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
      <body
        className={`flex min-h-screen flex-col outline antialiased relative bg-background text-foreground`}
      >
        <RootLayoutDebugWrapper>
          <Header />
          {children}
          <FooterServer />
        </RootLayoutDebugWrapper>
        <ToastContainer />
        <Script src="/vendor/silktide/consent-manager.js" strategy="afterInteractive" />
        <Script src="/vendor/silktide/config.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  description:
    'Moodbox - pierwsza w Polsce platforma z próbkami materiałów wnętrzarskich dla projektantów. Szybki dostęp do próbek w jednym boxie.  ',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
}
