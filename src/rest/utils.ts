import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { PaginationParams } from './types';

const withDefaultPaginationParams = <T extends Partial<PaginationParams>>(params?: T) => {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? DEFAULT_ITEMS_PER_INFINITE_LOAD;

  return { ...params, offset, limit };
};

export const RestUtils = { withDefaultPaginationParams };
