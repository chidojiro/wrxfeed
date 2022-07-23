import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { PaginationParams } from './types';

export const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  offset: 0,
  limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
};

export const BYPASS_INTERCEPTOR_HEADER = 'x-bypass-axios-interception';
