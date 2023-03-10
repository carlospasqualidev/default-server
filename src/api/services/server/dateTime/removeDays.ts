export interface IRemoveDays {
  date: Date;
  days: number;
}

export function removeDays({ date, days }: IRemoveDays) {
  return date.setDate(date.getDate() - days);
}

export function removeUTCDays({ date, days }: IRemoveDays) {
  return date.setDate(date.getUTCDate() - days);
}
