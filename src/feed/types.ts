import { DateRangePickerValue } from '@/common/components';
import { PaginationParams, SortByParams, SortOrderParams } from '@/rest/types';
import { Period } from '@/spending/types';
import { Entities } from '@/types';

export type GetTransactionsParams = PaginationParams & { feedItemId: number };

export type GetFeedCommentsParams = PaginationParams & SortOrderParams;

export type CreateCommentPayload = {
  content?: string;
  attachment?: string;
};

export type UpdateCommentPayload = CreateCommentPayload;

export type GetFeedsParams = PaginationParams & {
  mode?: FeedMode;
  departmentId?: number;
  targetId?: number;
  vendorId?: number;
  categoryId?: number;
  rootDepartment?: number;
  month?: number;
  year?: number;
};

export type CreateFeedbackPayload = {
  content: string;
};

export type GetLineItemsProps = {
  id: number;
  exclude: boolean;
  type: string;
  name: string;
};

export type GetTransactionTableItemsParams = PaginationParams &
  SortByParams & {
    props: GetLineItemsProps[];
    dateRange?: Exclude<DateRangeFilter, DateRangePickerValue>;
    from?: string;
    to?: string;
    groupBy: string;
  };

export type GetLineItemsPayload = PaginationParams &
  SortByParams & {
    props: Property[];
    dateRange?: Exclude<DateRangeFilter, DateRangePickerValue>;
    from?: string;
    to?: string;
    transIds?: number[];
    docNum?: string;
  };

export type FeedType = 'target' | 'rollup' | 'transaction';

export type FeedMode = 'company' | 'for-you';

export type GetUnreadLineItemCountParams = Omit<GetFeedsParams, keyof PaginationParams>;

export type Property = {
  id: number;
  type: Entities;
  name: string;
  exclude?: boolean;
};

export type DateRangeFilter = '30-days' | '90-days' | 'year-to-date' | DateRangePickerValue;

export type GetFeedSpendingParams = {
  props: Property[];
  periods: Period[];
  dateRange?: DateRangeFilter;
  from?: string;
  to?: string;
  groupByItem: Entities;
  groupByTime: 'year' | 'month' | 'day' | 'week';
};
