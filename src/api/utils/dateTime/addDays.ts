export interface IAddDays {
  date: Date;
  days: number;
}

export function addDays({ date, days }: IAddDays) {
  return new Date(date.setDate(date.getDate() + days));
}
