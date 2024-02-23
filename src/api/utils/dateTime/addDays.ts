import { IAddAndRemoveDays } from './types';

export function addDays({ date, days }: IAddAndRemoveDays) {
  return new Date(date.setDate(date.getDate() + days));
}
