import { BitBoolean } from '@/common/types';
import { PaginationParams } from '@/rest/types';

export type GetRecentlyViewedDepartmentSummariesParams = PaginationParams;

export type GetDepartmentsParams = PaginationParams & {
  parent?: number;
  term?: string;
  includeSub?: BitBoolean;
};
