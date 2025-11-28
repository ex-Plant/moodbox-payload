import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  const invalid = props['aria-invalid'] === true
  return (
    <input
      className={cn(
        `file:text-foreground placeholder:text-foreground selection:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive !aria-invalid:border-destructive  aria-invalid:text-destructive  h-9 w-full min-w-0 rounded-md border border-black bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[1px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className,
        invalid && '  border-destructive',
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
