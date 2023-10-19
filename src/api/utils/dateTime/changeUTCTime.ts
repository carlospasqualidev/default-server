export function changeUTCTime(date: Date, hours: number, minutes: number, seconds: number) {
  return new Date(date.setUTCHours(hours, minutes, seconds, 0));
}
