import { PaginationParams } from '@/rest/types';

export type GetCategoriesParams = PaginationParams & {
  term?: string;
  dep?: number;
};
