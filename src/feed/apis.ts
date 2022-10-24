import { Category, Comment, FeedItem, TransLineItem } from '@/main/entity';
import { Transaction } from '@/main/entity/transaction.entity';
import { RestApis } from '@/rest/apis';
import { BYPASS_INTERCEPTOR_HEADER } from '@/rest/constants';
import { PaginationParams } from '@/rest/types';
import { withDefaultPaginationParams } from '@/rest/utils';
import { AxiosResponse } from 'axios';
import {
  CreateCommentPayload,
  CreateFeedbackPayload,
  GetFeedCommentsParams,
  GetFeedsParams,
  GetLineItemsParams,
  GetTransactionsParams,
  GetTransactionTableItems,
  UpdateCommentPayload,
} from './types';

const get = (id: number) => RestApis.get<FeedItem>(`/feed/items/${id}`);

const getList = (params?: GetFeedsParams) => {
  const {
    departmentId: dep,
    rootDepartment: rootDep,
    categoryId: cat,
    vendorId: vend,
    ...restParams
  } = params ?? {};

  return RestApis.get<FeedItem[]>(`/feed/items`, {
    params: withDefaultPaginationParams({
      dep,
      rootDep,
      cat,
      vend,
      ...restParams,
    }),
  });
};

const getUnreadLineItemsCount = async (params?: Omit<GetFeedsParams, keyof PaginationParams>) => {
  const {
    departmentId: dep,
    rootDepartment: rootDep,
    categoryId: cat,
    vendorId: vend,
    ...restParams
  } = params ?? {};

  const res = await RestApis.get<AxiosResponse<Category[]>>(`/feed/items`, {
    params: { mode: 'company', dep, rootDep, cat, vend, limit: 1, offset: 0, ...restParams },
    headers: BYPASS_INTERCEPTOR_HEADER,
  });

  return parseInt(res.headers['x-unread-count'], 10);
};

const getTransactions = (params: GetTransactionsParams) =>
  RestApis.get<Transaction[]>(`/feed/transactions`, {
    params: withDefaultPaginationParams(params),
  });

const markAllTransactionsAsRead = () => RestApis.patch('/feed/items');

const createFeedback = async (feedId: number, payload: CreateFeedbackPayload) =>
  RestApis.post(`/feedback/feed-items/${feedId}/feedback`, payload);

const getComments = (id: number, params?: GetFeedCommentsParams) =>
  RestApis.get<Comment[]>(`/feed/items/${id}/comments`, {
    params: withDefaultPaginationParams(params),
  });

const createComment = (feedId: number, payload: CreateCommentPayload) =>
  RestApis.post<Comment>(`/feed/items/${feedId}/comments`, payload);

const updateComment = (id: number, payload: UpdateCommentPayload) =>
  RestApis.put<Comment>(`/feed/comments/${id}`, payload);

const deleteComment = (id: number) => RestApis.delete(`/feed/comments/${id}`);

const getLineItem = (id: number) => RestApis.get<TransLineItem>(`/feed/line-items/${id}`);

const getLineItems = (params: GetLineItemsParams) =>
  RestApis.get<AxiosResponse<TransLineItem[]>>(`/feed/line-items`, {
    params: withDefaultPaginationParams(params),
    headers: BYPASS_INTERCEPTOR_HEADER,
  }).then(({ data, headers }) => ({
    lineItems: data,
    totalCount: isNaN(+headers['x-total-count']) ? 0 : +headers['x-total-count'],
  }));

const getTransactionTableLineItems = (body: GetTransactionTableItems) =>
  RestApis.post(`/feedback/line-items`, {
    body: body,
  });

const updateLineItem = (id: number, payload: Partial<TransLineItem>) =>
  RestApis.patch<TransLineItem>(`/feed/line-items/${id}`, payload);

const markLineItemAsRead = (id: number) => updateLineItem(id, null as any);

const createLineItemFeedback = (id: number, payload: CreateFeedbackPayload) =>
  RestApis.post(`/feedback/line-items/${id}/feedback`, payload);

const getTransactionFeedItem = (id: number) =>
  RestApis.get<FeedItem[]>(`/feed/items?mode=for-you&lineItemId=${id}`);

export const FeedApis = {
  get,
  getList,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getTransactions,
  markAllTransactionsAsRead,
  getUnreadLineItemsCount,
  createFeedback,
  getLineItem,
  getLineItems,
  updateLineItem,
  markLineItemAsRead,
  createLineItemFeedback,
  getTransactionFeedItem,
  getTransactionTableLineItems,
};
