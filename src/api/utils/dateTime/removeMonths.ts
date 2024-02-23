import { IAddAndRemoveMonths } from './types';

export function removeMonths({ date, months }: IAddAndRemoveMonths) {
  return new Date(date.setMonth(date.getMonth() - months));
}
