export const formatDateAndTime = (_date: number) => {
  const date = new Date(_date).toLocaleDateString()
  const time = new Date(_date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return { date, time }
}
