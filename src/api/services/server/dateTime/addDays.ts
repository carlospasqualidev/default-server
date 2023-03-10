export interface IAddDays {
  date: Date;
  days: number;
}

export function addDays({ date, days }: IAddDays) {
  return date.setDate(date.getDate() + days);
}

export function addUTCDays({ date, days }: IAddDays) {
  return date.setDate(date.getUTCDate() + days);
}
