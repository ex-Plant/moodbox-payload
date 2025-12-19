type PropsT = {
  daysFromNow: number
}

export function createFutureDate({ daysFromNow }: PropsT): Date {
  const today = new Date().getTime()
  const addedDays = daysFromNow * 24 * 60 * 60 * 1000
  const computedDate = today + addedDays
  return new Date(computedDate)
}
