export const getDateStr = (date: any): string => {
  return new Date(date).toLocaleString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
