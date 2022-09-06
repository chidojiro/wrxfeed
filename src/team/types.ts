import { BitBoolean } from '@/common/types';
import { PaginationParams } from '@/rest/types';

export type GetRecentlyViewedDepartmentSummariesParams = PaginationParams;

export type GetDepartmentsParams = PaginationParams & {
  parent?: number;
  term?: string;
  includeSub?: BitBoolean;
};

export type TimeRange = 'last-30-days' | 'last-90-days' | 'year-to-date';

export type GetTopCategoriesParams = {
  from?: string;
  to?: string;
};
