import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-28 text-foreground">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">Nie znaleziono strony.</p>
      </div>
      <Button asChild variant="mood">
        <Link href="/">Strona główna</Link>
      </Button>
    </div>
  )
}
