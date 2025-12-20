type SurveyHeaderProps = {
  currentStep: number
  customerName: string | undefined
}

export default function SurveyHeader({ currentStep, customerName }: SurveyHeaderProps) {
  return (
    <div>
      {customerName && <p className={`text-3xl font-bold pb-8`}>Witaj {customerName}!</p>}
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
