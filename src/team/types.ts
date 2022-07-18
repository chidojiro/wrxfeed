import { BitBoolean } from '@/common/types';
import { PaginationParams } from '@/rest/types';

export type GetRecentlyViewedDepartmentSummariesParams = Partial<PaginationParams>;

export type GetDepartmentsParams = Partial<PaginationParams> & {
  parent?: number;
  term?: string;
  includeSub?: BitBoolean;
};
