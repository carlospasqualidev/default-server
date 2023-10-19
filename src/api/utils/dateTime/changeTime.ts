export function changeTime(date: Date, hours: number, minutes: number, seconds: number) {
  return new Date(date.setHours(hours, minutes, seconds, 0));
}
