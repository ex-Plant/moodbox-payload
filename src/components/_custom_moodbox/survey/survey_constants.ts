export const REASONS_P4A = [
  'estetyka materiału',
  'jakość wykonania',
  'format próbki',
  'zaufanie do producenta',
  'inne',
] as const

export const REASONS_P4B = [
  'estetyka materiału',
  'jakość wykonania',
  'format próbki',
  'zaufanie do producenta',
  'inne',
] as const

export const REASONS_P5 = [
  'estetyka nie pasuje do projektu',
  'jakość / wykończenie budzą wątpliwości',
  'format próbki jest niewystarczający',
  'materiał wygląda inaczej na żywo',
  'mam lepszą alternatywę',
  'inne',
] as const

export const ratings = [
  { rating: 1, text: 'użyję tylko warunkowo' },
  { rating: 2, text: 'raczej użyję' },
  { rating: 3, text: 'użyję w określonych sytuacjach' },
  { rating: 4, text: 'chętnie użyję' },
  { rating: 5, text: 'zdecydowanie użyję' },
] as const

export const surveyQuestions = [
  {
    id: 'q1',
    title: 'Których producentów z Twojego boxa realnie rozważył(a)byś w deklarowanym projekcie?',
    subtitle: '(wybierz maks. 3)',
  },
  {
    id: 'q2',
    title:
      'Jeśli miał(a)byś wskazać jednego producenta, którego raczej nie rozważasz w tym projekcie — który by to był?',
  },
  {
    id: 'q3',
    title: 'Na ile prawdopodobne jest, że użyjesz tego producenta w projekcie wnętrza?',
    subtitle: '(biorąc pod uwagę jakość materiału, wygląd i przydatność projektową)',
  },
  {
    id: 'q4',
    title: 'Szczegółowa ocena wybranych marek:',
  },
  {
    id: 'q5',
    title: 'Dlaczego marka {rejectedBrand} nie sprawdzi się w tym projekcie?',
    subtitle: '(wybierz maksymalnie 2)',
  },
  {
    id: 'q6',
    title: 'Czy chcesz, aby któryś z producentów skontaktował się z Tobą?',
  },
  {
    id: 'q7',
    title: 'Czy jest producent, którego realnie brakuje Ci w Moodboxie?',
    subtitle: '(jeśli tak — wpisz maksymalnie 1–2 marki)',
  },
  {
    id: 'q8',
    title: 'Jedna rzecz, którą możemy poprawić w MoodBox:',
  },
] as const

// UI Messages and Labels
export const UI_MESSAGES = {
  // Toast messages
  MAX_BRANDS_SELECTED: 'Możesz wybrać maksymalnie 3 producentów',
  MAX_REASONS_SELECTED: 'Możesz wybrać maksymalnie 2 powody',
  SELECT_AT_LEAST_ONE_BRAND:
    'Wybierz przynajmniej jednego producenta z którym rozważasz współpracę',

  // Form labels and placeholders
  SELECT_BRAND_OPTIONAL: 'Wybierz producenta (opcjonalnie)',
  NO_SUCH_BRAND_OPTION: 'Nie mam takiego / wszyscy są OK',
  YOUR_ANSWER_PLACEHOLDER: 'Twoja odpowiedź...',
  WHICH_BRANDS: 'Które marki?',
  SPECIFY_EXACTLY: 'Co dokładnie?',

  // Question texts
  POSITIVE_BRAND_QUESTION: 'Co najbardziej przemawia za użyciem tej marki w projekcie?',
  NEGATIVE_BRAND_QUESTION: 'Co ogranicza użycie tej marki w tym projekcie?',
  SELECT_MAX_2: '(wybierz maks. 2)',

  // Buttons
  YES: 'Tak',
  NO: 'Nie',
  NEXT_STEP: 'Następny krok',
  SEND_SURVEY: 'Wyślij ankietę',

  // Discount related
  WELCOME_DISCOUNT_TITLE: 'Welcome Discount',
  DISCOUNT_SUCCESS_MESSAGE: 'Kod rabatowy został wygenerowany pomyślnie:',
  DISCOUNT_FAILURE_MESSAGE: 'Wystąpił błąd podczas generowania kodu rabatowego.',

  // Dialog messages
  THANK_YOU_SURVEY: 'Dziękujemy za wypełnienie ankiety!',
  YOUR_CODE_IS: 'Twój kod rabatowy na kolejne zamówienie w Moodbox Polska: ',
  SAME_CODE_IN_EMAIL: 'Ten sam kod znajdziesz również w wiadomości e-mail.',
  GO_TO_MOODBOX: 'Przejdź do moodbox',

  // Terms and conditions
  TERMS_ACCEPTANCE_TEXT:
    'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji pilotażu MoodBox Polska oraz przygotowania raportów dla producentów.',

  // Errors
  FIX_ERRORS_BEFORE_SENDING: 'Ankieta zawiera błędy',

  // Header messages
  WELCOME_MESSAGE: 'Witaj',
  SURVEY_TITLE: 'Podsumowanie pracy z Moodboxem',
  SURVEY_DESCRIPTION:
    'Krótki przegląd materiałów z Twojego boxa. Wypełnij formularz i odbierz kod rabatowy na kolejne zamówienie.',
  STEP_LABEL: 'KROK',
  STEP_SEPARATOR: '/',
  TOTAL_STEPS: '3',

  // Survey completed page
  SURVEY_ALREADY_COMPLETED_TITLE: 'Wygląda na to, że Twoja ankieta została już wypełniona!',
  SURVEY_ALREADY_COMPLETED_THANK_YOU: 'Dziękujemy za Twój czas!',
  SURVEY_ALREADY_COMPLETED_INSTRUCTIONS:
    'Jeśli nie wypełniałeś/aś jeszcze ankiety lub nie masz kodu rabatowego, napisz do nas.',
  CONTACT_EMAIL: 'hello@moodbox.pl',
} as const
