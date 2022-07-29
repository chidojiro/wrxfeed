export type PaginationParams = {
  offset?: number;
  limit?: number;
};

export type SortOrder = 'ASC' | 'DESC';

export type SortOrderParams = {
  order?: SortOrder;
};

export type SortByParams = SortOrderParams & {
  sortBy?: string;
};
