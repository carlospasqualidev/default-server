export function setToUTCMidnight(date: Date) {
  return new Date(date.setUTCHours(3, 0, 0, 0));
}
