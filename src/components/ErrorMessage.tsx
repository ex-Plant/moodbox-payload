import React from 'react'

type ErrorMessagePT = {
  readonly message?: string
}

export function ErrorMessage({
  message = 'Coś poszło nie tak - spróbuj ponownie',
}: ErrorMessagePT): React.JSX.Element {
  return (
    <p
      style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#dc2626',
      }}
      role="alert"
    >
      {message}
    </p>
  )
}
