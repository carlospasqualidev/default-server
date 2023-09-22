export interface IRemoveDays {
  date: Date;
  days: number;
}

export function removeDays({ date, days }: IRemoveDays) {
  const newDate = new Date(date);

  newDate.setDate(date.getDate() - days);

  return newDate;
}
