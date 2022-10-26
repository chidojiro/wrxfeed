import { DateRangeFilter, Property } from '@/feed/types';
import { Entities } from '@/types';

export type CreateInsightPayload = {
  name: string;
  props: Property[];
  dateRange: DateRangeFilter;
  groupBy: Entities;
};
