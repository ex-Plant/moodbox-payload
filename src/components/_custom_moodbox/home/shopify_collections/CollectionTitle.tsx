import { Tip } from '../../../ui/Tip'

type PropsT = {
  title: string
  selectedWithinCatLen: number
  showItemsLimitInfo: boolean
}

export default function CollectionTitle({
  title,
  selectedWithinCatLen,
  showItemsLimitInfo,
}: PropsT) {
  return (
    <header
      className={`text-mood-dark-gray text-md pb-6 lg:text-[1.5rem] xl:pl-4 relative min-h-10 `}
    >
      <h3 className={`font-bold `}>
        <span>{title}</span>
        {selectedWithinCatLen > 1 && <span className={`mx-2`}>{selectedWithinCatLen} / 2</span>}
      </h3>
      {showItemsLimitInfo && (
        <span className={`text-base absolute bottom-[6px] xl:pl-4 left-0 `}>
          Możesz wybrać maksymalnie dwie próbki z każdej kategorii
        </span>
      )}
    </header>
  )
}
