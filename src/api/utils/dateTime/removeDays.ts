export interface IRemoveDays {
  date: Date;
  days: number;
}

export function removeDays({ date, days }: IRemoveDays) {
  return new Date(date.setDate(date.getDate() - days));
}
