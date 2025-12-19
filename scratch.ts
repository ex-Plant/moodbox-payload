const date = new Date().getTime()
const sevenDays = 7 * 24 * 60 * 60 * 1000
console.log(sevenDays)
const sevenDaysFromNow = date + sevenDays

console.log(new Date(sevenDaysFromNow))
