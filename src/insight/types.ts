import { Property } from '@/feed/types';
import { FeedItem, User } from '@/main/entity';
import { PaginationParams, SortByParams } from '@/rest/types';
import { Entities } from '@/types';
import { DateRangeFilter } from './../feed/types';

export type CreateInsightPayload = {
  name: string;
  props: Property[];
  dateRange: DateRangeFilter;
  groupBy: Entities;
};

export type GetInsightLineItemsBody = PaginationParams &
  SortByParams & {
    props: Property[];
    dateRange: DateRangeFilter;
    groupBy: Entities;
  };

export type UpdateInsightPayload = CreateInsightPayload;

export type InsightFeedItem = {
  id: number;
  type: string;
  transactionIds: number[];
  depId: number;
  catId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  lastInteraction: string;
  year: number;
  month: number;
  targetId: number;
  lineItemId: number;
  insightId: number;
  insight: Insight;
  hidden: boolean;
};

export type Insight = {
  id: number;
  name: string;
  props: Property[];
  companyId: number;
  dateRange: DateRangeFilter;
  groupBy: Entities;
  createdAt: string;
  updatedAt: string;
  creator: User;
  feedItem: FeedItem;
};
