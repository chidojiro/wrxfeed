import { DateRangeFilter } from '@/feed/types';
import { XAxisByDay } from './XAxisByDay';
import { XAxisByMonth } from './XAxisByMonth';
import { XAxisByWeek } from './XAxisByWeek';

export type XAxisProps = {
  hoveredIndex?: number;
  dateRange?: DateRangeFilter;
};

export const XAxis = ({ hoveredIndex, dateRange }: XAxisProps) => {
  if (dateRange === '30-days') return <XAxisByDay />;

  if (dateRange === '90-days') return <XAxisByWeek />;

  return <XAxisByMonth hoveredIndex={hoveredIndex} />;
};
