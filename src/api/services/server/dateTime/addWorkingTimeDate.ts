import { IAddWorkingTimeDate } from './types';

export const addWorkingTimeDate = ({ date, days }: IAddWorkingTimeDate) => {
  const workingDate = new Date(
    new Date(date).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    }),
  );

  let daysCount = 0;

  while (daysCount < days) {
    workingDate.setDate(workingDate.getDate() + 1);

    if (workingDate.getDay() !== 0 && workingDate.getDay() !== 6) {
      daysCount++;
    }
  }

  return workingDate;
};
