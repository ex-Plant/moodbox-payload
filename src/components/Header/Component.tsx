import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Nav from '@/components/_custom_moodbox/nav/Nav'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <Nav headerData={headerData} />
}
