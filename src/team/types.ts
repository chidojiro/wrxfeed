import { DateRangeFilter } from '@/feed/types';
import { PaginationParams } from '@/rest/types';

export type GetRecentlyViewedDepartmentSummariesParams = PaginationParams;

export type GetDepartmentsParams = PaginationParams & {
  parent?: number;
  term?: string;
  includeSub?: boolean;
};

export type GetTopCategoriesParams = {
  dateRange: DateRangeFilter;
};
