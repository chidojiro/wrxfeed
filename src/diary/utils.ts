import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import subMonths from 'date-fns/subMonths';
import { ActivityFilterModel, TimeRange } from './types';

type FilterDate = Date | undefined;

export function getTimeRangeFromFilter(filter: ActivityFilterModel): [FilterDate, FilterDate] {
  let from: FilterDate;
  let to: FilterDate;
  switch (filter.timeRange) {
    case TimeRange.ThisWeek:
      from = startOfWeek(new Date(), { weekStartsOn: 1 });
      to = endOfWeek(new Date(), { weekStartsOn: 1 });
      break;

    case TimeRange.ThisMonth:
      from = startOfMonth(new Date());
      to = endOfMonth(new Date());
      break;

    case TimeRange.ThisYear:
      from = startOfYear(new Date());
      to = endOfYear(new Date());
      break;

    case TimeRange.LastMonth:
      from = startOfMonth(subMonths(new Date(), 1));
      to = endOfMonth(subMonths(new Date(), 1));
      break;

    default:
      from = filter.from;
      to = filter.to;
      break;
  }
  return [from, to];
}
