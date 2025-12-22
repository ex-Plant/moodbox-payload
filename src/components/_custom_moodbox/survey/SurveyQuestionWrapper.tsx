import { cn } from '../../../utilities/ui'

type PropsT = {
  children: React.ReactNode
  className?: string
}

export default function QuestionWrapper({ children, className }: PropsT) {
  return (
    <section className={cn(` space-y-4 bg-white p-8 rounded-md `, className)}>{children}</section>
  )
}
