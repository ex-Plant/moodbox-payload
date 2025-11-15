import { PartnersBlock } from '@/payload-types'
import { ImageMedia } from '../Media/ImageMedia'

export const Partners: React.FC<PartnersBlock> = ({ partners }) => {
  return (
    <section className={`xPaddings mx-auto max-w-[1440px] xPaddings min-h-20  text-white`}>
      <div className="grid px-4 grid-cols-1 gap-8 md:grid-cols-3  bg-mood-dark-brown py-8 ">
        {partners?.map((partner) => {
          return (
            <div
              key={partner.id}
              className="w-full h-[150px] relative flex items-center justify-center "
            >
              <ImageMedia
                resource={partner.partner}
                size="(max-witdth: 767px) 40vw, 20vw"
                fill={true}
                imgClassName="object-contain"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
