import { IAddAndRemoveMinutes } from './types';

export function addMinutes({ date, minutes }: IAddAndRemoveMinutes) {
  return new Date(date.getTime() + minutes * 60000);
}
