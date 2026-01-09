import React from 'react'

type ErrorMessagePT = {
  readonly message?: string
}

export function ErrorMessage({
  message = 'Coś poszło nie tak - spróbuj ponownie',
}: ErrorMessagePT): React.JSX.Element {
  return (
    <p className="mt-2 text-sm font-medium text-red-600" role="alert">
      {message}
    </p>
  )
}
