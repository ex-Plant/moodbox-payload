interface AccessDeniedProps {
  title?: string
  message?: string
}

export default function AccessDenied({
  title = 'Access Denied',
  message = 'You must be logged in to the admin panel to access this page',
}: AccessDeniedProps) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="border rounded-lg p-6 bg-red-50 border-red-200">
        <h1 className="text-2xl font-bold mb-4 text-red-800">{title}</h1>
        <p className="text-red-700 mb-4">{message}</p>
      </div>
    </div>
  )
}
