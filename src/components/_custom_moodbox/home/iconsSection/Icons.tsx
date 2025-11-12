import IconItem from './IconItem'
import { ClipboardList, Cuboid, SquareCheckBig, Truck } from 'lucide-react'
import { tr } from '@/lib/translations/pl'

export default function Icons() {
  const iconClass = 'stroke-mood-brown h-14 xl:h-28 w-auto'

  return (
    <div>
      <div
        className={`xPaddings mx-auto grid max-w-[1440px] grid-cols-2 gap-4 py-12 md:grid-cols-4 xl:py-20`}
      >
        <IconItem text={tr.icons.chooseSamples} icon={<SquareCheckBig className={iconClass} />} />
        <IconItem text={tr.icons.fillForm} icon={<ClipboardList className={iconClass} />} />
        <IconItem text={tr.icons.payBox} icon={<Cuboid className={iconClass} />} />
        <IconItem text={tr.icons.receive} icon={<Truck className={iconClass} />} />
      </div>
    </div>
  )
}
