import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full  bg-white px-6 py-4  placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring  aria-invalid:ring-destructive/20 aria-invalid:border-destructive !aria-invalid:border-destructive  aria-invalid:text-destructive rounded-md border text-base shadow-xs  transition-[color,box-shadow] outline-none   ',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
