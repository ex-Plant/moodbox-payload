import { cn } from '../../../utilities/ui'

type PropsT = {
  children: React.ReactNode
  className?: string
}

export default function QuestionWrapper({ children, className }: PropsT) {
  return (
    <section className={cn(`border border-black p-8 rounded-md shadow-sm`, className)}>
      {children}
    </section>
  )
}
