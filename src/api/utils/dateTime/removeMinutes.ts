import { IAddAndRemoveMinutes } from './types';

export function removeMinutes({ date, minutes }: IAddAndRemoveMinutes) {
  return new Date(date.getTime() - minutes * 60000);
}
