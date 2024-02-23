import { addDays, changeUTCTime } from '../dateTime';
import { checkDateRanges, checkIfNaN, checkValues } from '../validator';

function setToFilterEndDate(date: string | undefined) {
  return date ? addDays({ date: changeUTCTime(new Date(date), 2, 59, 59), days: 1 }) : undefined;
}

function setToFilterStartDate(date: string | undefined) {
  return date ? changeUTCTime(new Date(date), 3, 0, 0) : undefined;
}

function handleQueryTake(take: string | undefined, maxTake?: number) {
  checkIfNaN([{ label: 'Número de registros', number: take }]);
  return Math.min(Math.abs(Number(take || 20)), maxTake || 100);
}

function handleQueryPage(page: string | undefined) {
  checkIfNaN([{ label: 'Página', number: page }]);
  return Math.abs(Number(page) || 1);
}

function handleQueryFilter(search: string | undefined) {
  return search || '';
}

interface IHandleQueryFilterService {
  page: string;
  take: string;
  search?: string | undefined;
  startAt: string | undefined;
  endAt: string | undefined;
}

export function handleQueryFilterService({
  page,
  search,
  take,
  endAt,
  startAt,
}: IHandleQueryFilterService) {
  startAt = startAt || undefined;
  endAt = endAt || undefined;

  checkValues([
    { label: 'Data inicial', type: 'date', value: startAt, required: false },
    { label: 'Data final', type: 'date', value: endAt, required: false },
  ]);

  checkDateRanges([{ label: 'Data', startDate: startAt, endDate: endAt }]);

  return {
    search: handleQueryFilter(search),
    page: handleQueryPage(page),
    take: handleQueryTake(take),
    startAt: setToFilterStartDate(startAt),
    endAt: setToFilterEndDate(endAt),
  };
}
