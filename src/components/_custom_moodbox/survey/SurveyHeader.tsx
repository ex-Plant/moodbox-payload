type SurveyHeaderProps = {
  currentStep: number
}

export default function SurveyHeader({ currentStep }: SurveyHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Podsumowanie pracy z Moodboxem</h1>
      <p className="text-foreground">
        Krótki przegląd materiałów z Twojego boxa. Wypełnij formularz i odbierz kod rabatowy na
        kolejne zamówienie.
      </p>
      <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-mood-dark-brown">
        KROK {currentStep} / 3
      </div>
    </div>
  )
}
