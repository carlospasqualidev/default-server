import { ErrorMessage } from '../error';
import { ICheckDateRanges } from './types';

export function checkDateRanges(data: ICheckDateRanges[]) {
  data.forEach(({ startDate, endDate, label, allowEquals = true }) => {
    if (!allowEquals && startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A ${label} inicial deve ser maior ou igual a ${label} final.`,
      });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A ${label} inicial deve ser maior que a ${label} final.`,
      });
    }
  });
}
