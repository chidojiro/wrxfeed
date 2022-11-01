import { PaginationParams, SortOrderParams } from '@/rest/types';

export type GetCategorySpendingsParams = {
  year?: number;
  groupBy?: 'DEPARTMENT' | 'VENDOR';
};

export type GetCategoriesParams = PaginationParams &
  SortOrderParams & {
    term?: string;
    dep?: number;
  };
