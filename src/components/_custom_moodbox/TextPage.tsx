type PropsT = {
  children: React.ReactNode
}

export default function TextPage({ children }: PropsT) {
  return <main className={`mx-auto pt-32 max-w-[1440px] `}>{children}</main>
}
