'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={`flex h-[80vh] flex-col items-center justify-center`}>
      <p className={`text-[40px]`}>⚠️ </p>
      <h2>Ups... Coś poszło nie tak </h2>
      <Button
        variant={`moodDark`}
        className={`mt-4 cursor-pointer`}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Spróbuj ponownie
      </Button>
    </div>
  )
}
