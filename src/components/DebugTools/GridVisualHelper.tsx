import { cn } from '@/utilities/ui'

export const GridVisualHelperRow = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`col-span-1 border border-r`, className)}>
      <div className={`h-full bg-red-500/10`}></div>
    </div>
  )
}

export const GridVisualHelper = () => {
  return (
    <div
      className={`grid grid-cols-6 lg:grid-cols-12 xPaddings fixed inset-0 z-[10000] max-w-[1440px] mx-auto pointer-events-none `}
    >
      <GridVisualHelperRow />
      <GridVisualHelperRow />
      <GridVisualHelperRow />
      <GridVisualHelperRow />
      <GridVisualHelperRow />
      <GridVisualHelperRow />
      <GridVisualHelperRow className={`hidden md:block`} />
      <GridVisualHelperRow className={`hidden md:block`} />
      <GridVisualHelperRow className={`hidden lg:block`} />
      <GridVisualHelperRow className={`hidden lg:block`} />
      <GridVisualHelperRow className={`hidden lg:block`} />
      <GridVisualHelperRow className={`hidden lg:block`} />
    </div>
  )
}
