import type { SurveyContent } from '@/payload-types'

export const DEFAULT_SURVEY_CONTENT: SurveyContent = {
  id: 0,
  questions: {
    q1: {
      title: 'Których producentów z Twojego boxa realnie rozważył(a)byś w deklarowanym projekcie?',
      subtitle: '(wybierz maks. 3)',
    },
    q2: {
      title:
        'Jeśli miał(a)byś wskazać jednego producenta, którego raczej nie rozważasz w tym projekcie — który by to był?',
      subtitle: null,
    },
    q3: {
      title: 'Na ile prawdopodobne jest, że użyjesz tego producenta w projekcie wnętrza?',
      subtitle: '(biorąc pod uwagę jakość materiału, wygląd i przydatność projektową)',
    },
    q4: {
      title: 'Szczegółowa ocena wybranych marek:',
      subtitle: null,
    },
    q5: {
      title: 'Dlaczego marka {rejectedBrand} nie sprawdzi się w tym projekcie?',
      subtitle: '(wybierz maksymalnie 2)',
    },
    q6: {
      title: 'Czy chcesz, aby któryś z producentów skontaktował się z Tobą?',
      subtitle: null,
    },
    q7: {
      title: 'Czy jest producent, którego realnie brakuje Ci w Moodboxie?',
      subtitle: '(jeśli tak — wpisz maksymalnie 1–2 marki)',
    },
    q8: {
      title: 'Jedna rzecz, którą możemy poprawić w Moodbox:',
      subtitle: null,
    },
  },
  discountPercentage: 10,
  ratings: [
    { text: 'użyję tylko warunkowo', id: '1' },
    { text: 'raczej użyję', id: '2' },
    { text: 'użyję w określonych sytuacjach', id: '3' },
    { text: 'chętnie użyję', id: '4' },
    { text: 'zdecydowanie użyję', id: '5' },
  ],
  reasonsPositive: [
    { text: 'estetyka materiału', id: '1' },
    { text: 'jakość wykonania', id: '2' },
    { text: 'format próbki', id: '3' },
    { text: 'zaufanie do producenta', id: '4' },
    { text: 'inne', id: '5' },
  ],
  reasonsNegative: [
    { text: 'estetyka materiału', id: '1' },
    { text: 'jakość wykonania', id: '2' },
    { text: 'format próbki', id: '3' },
    { text: 'zaufanie do producenta', id: '4' },
    { text: 'inne', id: '5' },
  ],
  reasonsRejection: [
    { text: 'estetyka nie pasuje do projektu', id: '1' },
    { text: 'jakość / wykończenie budzą wątpliwości', id: '2' },
    { text: 'format próbki jest niewystarczający', id: '3' },
    { text: 'materiał wygląda inaczej na żywo', id: '4' },
    { text: 'mam lepszą alternatywę', id: '5' },
    { text: 'inne', id: '6' },
  ],
  uiMessages: {
    toasts: {
      maxBrandsSelected: 'Możesz wybrać maksymalnie 3 producentów',
      maxReasonsSelected: 'Możesz wybrać maksymalnie 2 powody',
      selectAtLeastOneBrand:
        'Wybierz przynajmniej jednego producenta z którym rozważasz współpracę',
    },
    formLabels: {
      selectBrandOptional: 'Wybierz producenta (opcjonalnie)',
      noSuchBrandOption: 'Nie mam takiego / wszyscy są OK',
      yourAnswerPlaceholder: 'Twoja odpowiedź...',
      whichBrands: 'Które marki?',
      specifyExactly: 'Co dokładnie?',
    },
    questionTexts: {
      positiveBrandQuestion: 'Co najbardziej przemawia za użyciem tej marki w projekcie?',
      negativeBrandQuestion: 'Co ogranicza użycie tej marki w tym projekcie?',
      selectMax2: '(wybierz maks. 2)',
    },
    buttons: {
      yes: 'Tak',
      no: 'Nie',
      nextStep: 'Następny krok',
      sendSurvey: 'Wyślij ankietę',
    },
    discount: {
      welcomeDiscountTitle: 'Welcome Discount',
      discountSuccessMessage: 'Kod rabatowy został wygenerowany pomyślnie:',
      discountFailureMessage: 'Wystąpił błąd podczas generowania kodu rabatowego.',
    },
    dialog: {
      thankYouSurvey: 'Dziękujemy za wypełnienie ankiety!',
      yourCodeIs: 'Twój kod rabatowy na kolejne zamówienie w Moodbox Polska: ',
      sameCodeInEmail: 'Ten sam kod znajdziesz również w wiadomości e-mail.',
      goToMoodbox: 'Przejdź do moodbox',
    },
    terms: {
      termsAcceptanceText:
        'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji pilotażu Moodbox Polska oraz przygotowania raportów dla producentów.',
    },
    errors: {
      fixErrorsBeforeSending: 'Ankieta zawiera błędy',
    },
    header: {
      welcomeMessage: 'Witaj',
      surveyTitle: 'Podsumowanie pracy z Moodboxem',
      surveyDescription:
        'Krótki przegląd materiałów z Twojego boxa. Wypełnij formularz i odbierz kod rabatowy na kolejne zamówienie.',
      stepLabel: 'KROK',
      stepSeparator: '/',
      totalSteps: '3',
    },
    completed: {
      surveyAlreadyCompletedTitle: 'Wygląda na to, że Twoja ankieta została już wypełniona!',
      surveyAlreadyCompletedThankYou: 'Dziękujemy za Twój czas!',
      surveyAlreadyCompletedInstructions:
        'Jeśli nie wypełniałeś/aś jeszcze ankiety lub nie masz kodu rabatowego, napisz do nas.',
      contactEmail: 'hello@moodbox.pl',
    },
  },
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
}
