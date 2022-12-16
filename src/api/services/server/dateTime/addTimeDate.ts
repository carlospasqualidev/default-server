import { IAddTimeDate } from './types';

export const addTimeDate = ({ date, addDays, addMinutes }: IAddTimeDate) => {
  let newDate = new Date(date);

  if (addDays) {
    newDate.setDate(date.getDate() + addDays);
  }
  if (addMinutes) {
    newDate = new Date(newDate.getTime() + addMinutes * 60000);
  }
  return newDate;
};
