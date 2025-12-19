import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className=" py-28 text-foreground xPaddings max-w-[1440px] mx-auto  grow flex  items-center justify-center ">
      <div>
        <div className="text-xl pb-4 ">
          <h1 className={`text-5xl mb-2`}>404</h1>
          <p>Nie znaleziono strony.</p>
        </div>
        <Button asChild variant="mood">
          <Link href="/">Strona główna</Link>
        </Button>
      </div>
    </div>
  )
}
