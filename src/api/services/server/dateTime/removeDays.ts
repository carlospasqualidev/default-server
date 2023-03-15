export interface IRemoveDays {
  date: Date;
  days: number;
}

export function removeUTCDays({ date, days }: IRemoveDays) {
  return date.setDate(date.getUTCDate() - days);
}
