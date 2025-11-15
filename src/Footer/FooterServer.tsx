import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import FooterClient from './Footer'
import { Footer } from '@/payload-types'

export async function FooterServer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const footerItems = footerData?.navItems || []

  return <FooterClient footerItems={footerItems} />
}
