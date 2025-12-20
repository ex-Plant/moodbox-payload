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
        'flex min-h-[80px] w-full  bg-white px-3 py-2  ring-offset-background placeholder:text-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive !aria-invalid:border-destructive  aria-invalid:text-destructive rounded-md border border-black text-base shadow-xs  transition-[color,box-shadow] outline-none  focus-visible:ring-[1px] ',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
