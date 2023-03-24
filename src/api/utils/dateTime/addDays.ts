export interface IAddDays {
  date: Date;
  days: number;
}

export function addUTCDays({ date, days }: IAddDays) {
  return date.setDate(date.getUTCDate() + days);
}
