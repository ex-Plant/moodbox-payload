import Delimiter from '../Delimiter/Delimiter'
import { Button } from './ui/button'
import { moodboxInfo } from '../../../../../moodbox.pl/src/lib/temp/temp'

export default function TextPage() {
  return (
    <>
      <div className={`mx-auto mt-32 max-w-[1440px]`}>
        {/*<div className={`border-mood-brown mb-8 border-b`}>*/}
        {/*	<h1 className={`text-mood-dark-gray text-[2rem]`}>Wszystko, co warto wiedzieć</h1>*/}
        {/*</div>*/}
        <Delimiter className={`mt-8`} title={'Wszystko, co warto wiedzieć'} />
        <div className={`xPaddings`}>
          <div className={`grid gap-4 pl-4`}>
            {moodboxInfo.sections.map((section) => {
              return (
                <section key={section.title} className={`[&_p]:pb-4`}>
                  <h3 className={`pb-2 text-[1.5rem] font-bold`}>{section.title}</h3>
                  <div className={`pl-8`} dangerouslySetInnerHTML={{ __html: section.content }} />
                </section>
              )
            })}
          </div>
          <div className={`px-4`}>
            <h2
              className={`text-mood-dark-gray border-mood-dark-brown border-b pt-8 pb-8 text-center text-[1.5rem]`}
            >
              Producenci – dołączcie do pilotażu Moodbox i pokażcie swoje materiały projektantom
            </h2>
            <div className={`flex justify-center py-8`}>
              <a className={`cursor-pointer`} href="mailto:hello@moodbox.pl">
                <Button size={`lg`} variant={`moodDark`}>
                  Skontaktuj się z nami
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
