import Link from 'next/link'

export default function SurveyCompletedPage() {
  return (
    <main className="mx-auto max-w-[800px] py-32 px-4 xPaddings text-center grow content-center">
      <h1 className="text-2xl font-bold mb-4">
        Wygląda na to, że Twoja ankieta została już wypełniona!
      </h1>
      <p>Dziękujemy za Twój czas!</p>
      <div className={`pt-2 text-balance space-y-2`}>
        <p>Jeśli nie wypełniałeś/aś jeszcze ankiety lub nie masz kodu rabatowego, napisz do nas.</p>
        <p>
          <Link href="mailto:hello@moodbox.pl">hello@moodbox.pl</Link>
        </p>
      </div>
    </main>
  )
}
