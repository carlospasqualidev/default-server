import { IAddAndRemoveMonths } from './types';

export function addMonths({ date, months }: IAddAndRemoveMonths) {
  return new Date(date.setMonth(date.getMonth() + months));
}
