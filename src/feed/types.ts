import { SortByParams } from '@/rest/types';
import { BitBoolean } from '@/common/types';
import { PaginationParams, SortOrderParams } from '@/rest/types';

export type GetTransactionsParams = PaginationParams & { feedItemId: number };

export type GetFeedCommentsParams = PaginationParams & SortOrderParams;

export type CreateCommentPayload = {
  content?: string;
  attachment?: string;
};

export type UpdateCommentPayload = CreateCommentPayload;

export type GetFeedsParams = PaginationParams & {
  forYou?: BitBoolean;
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

export type GetLineItemsParams = PaginationParams &
  SortByParams & {
    depId?: number;
    catId?: number;
    vendId?: number;
    from: string;
    to: string;
  };

export type FeedType = 'target' | 'rollup';

export type GetUnreadLineItemCountParams = Omit<GetFeedsParams, keyof PaginationParams>;
