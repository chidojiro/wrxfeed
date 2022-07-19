import { PaginationParams } from '@/rest/types';

export type GetCategoriesParams = PaginationParams & {
  term?: string;
  dep?: number;
};

export type GetTransactionsParams = PaginationParams & { feedItemId: number };
