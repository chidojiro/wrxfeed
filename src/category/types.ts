import { PaginationParams, SortOrderParams } from '@/rest/types';

export type GetCategorySpendingsParams = {
  year?: number;
};

export type GetCategoriesParams = PaginationParams &
  SortOrderParams & {
    term?: string;
    dep?: number;
  };
