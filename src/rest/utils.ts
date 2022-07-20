import { PaginationParams } from './types';

export const withDefaultPaginationParams = <T extends Partial<PaginationParams>>(params?: T) => {
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 0;

  return { ...params, offset, limit };
};
