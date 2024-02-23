import { IAddAndRemoveDays } from './types';

export function removeDays({ date, days }: IAddAndRemoveDays) {
  return new Date(date.setDate(date.getDate() - days));
}
