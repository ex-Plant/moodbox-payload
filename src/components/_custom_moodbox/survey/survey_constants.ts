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
    title: 'Jeśli miał(a)byś wskazać jednego producenta, którego raczej nie rozważasz w tym projekcie — który by to był?',
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
