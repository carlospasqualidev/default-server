/**
 *@example changetime(New Date(), 0, 0, 0)
 */
export function changeTime(date: Date, hours: number, minutes: number, seconds: number) {
  return new Date(date.setUTCHours(hours, minutes, seconds, 0));
}
