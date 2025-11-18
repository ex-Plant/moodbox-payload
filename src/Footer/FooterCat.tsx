import { cn } from '@/utilities/ui'

type T = {
  title: string
  className?: string
  children?: React.ReactNode
}

export default function FooterCat({ title, className, children }: T) {
  return (
    <div className={cn(`space-y-2 font-bold uppercase xl:col-span-3`, className)}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
