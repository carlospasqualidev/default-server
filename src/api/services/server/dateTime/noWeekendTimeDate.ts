import { addTimeDate } from './addTimeDate';
import { removeTimeDate } from './removeTimeDate';

export const noWeekendTimeDate = ({ date }: { date: Date }) => {
  let dateNoWeekend;

  switch (date.getDay()) {
    case 0:
      dateNoWeekend = addTimeDate({
        date,
        days: 1,
      });
      break;
    case 6:
      dateNoWeekend = removeTimeDate({
        date,
        days: 1,
      });
      break;

    default:
      dateNoWeekend = date;
      break;
  }

  return dateNoWeekend;
};
