'use client'

import FooterCat from './FooterCat'
import FooterLink from './FooterLink'
import { Footer } from '@/payload-types'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import NewsletterForm from './NewsletterForm'
import LogoMoodboxSvg from '../_custom_moodbox/common/LogoMoodboxSvg'
export default function FooterClient({ footerItems }: { footerItems: Footer['navItems'] }) {
  return (
    <footer className={`xPaddings relative mx-auto mt-auto w-full max-w-[1440px] pb-12 `}>
      <div
        className={`pointer-events-none absolute top-12 right-0 left-0 hidden items-center justify-center xl:flex`}
      >
        <LogoMoodboxSvg />
      </div>
      <div
        className={`text-mood-dark-brown border-mood-brown grid gap-y-4 border-t pt-4 xl:grid-cols-12 xl:gap-y-0`}
      >
        <FooterCat className={`xl:pl-4`} title={'Obsługa klienta'}>
          <div className={`grid gap-1`}>
            {footerItems?.map((item) => (
              <FooterLink key={item.id} item={item} />
            ))}
          </div>
        </FooterCat>
        {/* <FooterCat title={'Kontakt'}>
          <div
            className={cn(
              `hover:border-mood-dark-brown border-b border-transparent delay-200 duration-200 pb-0.5 lowercase w-fit`,
            )}
          >
            <Link href={'mailto:hello@moodbox.pl'} className={`font-normal w-fit`}>
              hello@moodbox.pl
            </Link>
          </div>
        </FooterCat> */}
        <div className={` xl:col-start-9 xl:col-span-4 pr-4`}>
          <FooterCat title={'Newsletter'} className={'xl:px-4 '} />
          <NewsletterForm />
        </div>
      </div>
      <div className={`pointer-events-none flex items-center justify-center py-4 xl:hidden`}>
        <LogoMoodboxSvg />
      </div>
    </footer>
  )
}
