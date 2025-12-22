import { cn } from '../../../utilities/ui'

type PropsT = {
  children: React.ReactNode
  className?: string
}

export default function QuestionWrapper({ children, className }: PropsT) {
  return (
    <section className={cn(`border border-mood-brown p-8 rounded-md shadow-sm`, className)}>
      <div>{children}</div>
    </section>
  )
}
