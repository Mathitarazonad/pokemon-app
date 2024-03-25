export const getInFeetInches = (number: number) => {
  const numberConverted = number / 3.048
  const numberInStringArr = numberConverted.toFixed(2).split('.')

  return numberInStringArr[0] + "'" + numberInStringArr[1] + '"'
}
