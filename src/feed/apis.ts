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
  GetCategoriesParams,
  GetFeedCommentsParams,
  GetFeedsParams,
  GetLineItemsParams,
  GetTransactionsParams,
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
    params: withDefaultPaginationParams({ dep, rootDep, cat, vend, ...restParams }),
  });
};

const getCategory = (id: number) => RestApis.get<Category>(`/feed/categories/${id}`);

const getCategories = async (params?: GetCategoriesParams) =>
  RestApis.get<Category[]>('/feed/categories', {
    params: withDefaultPaginationParams(params),
  });

const updateCategory = async (id: number, payload: Partial<Category>) =>
  RestApis.patch<Category>(`/feed/categories/${id}`, payload);

const getUnreadLineItemsCount = async (params?: Omit<GetFeedsParams, keyof PaginationParams>) => {
  const {
    departmentId: dep,
    rootDepartment: rootDep,
    categoryId: cat,
    vendorId: vend,
    ...restParams
  } = params ?? {};

  const res = await RestApis.get<AxiosResponse<Category[]>>(`/feed/items`, {
    params: { dep, rootDep, cat, vend, limit: 1, offset: 0, ...restParams },
    headers: { [BYPASS_INTERCEPTOR_HEADER]: 'true' },
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

const createComment = (id: number, payload: CreateCommentPayload) =>
  RestApis.post<Comment>(`/feed/items/${id}/comments`, payload);

const updateComment = (id: number, payload: UpdateCommentPayload) =>
  RestApis.put<Comment>(`/feed/comments/${id}`, payload);

const deleteComment = (id: number) => RestApis.delete(`/feed/comments/${id}`);

const getLineItem = (id: number) => RestApis.get<TransLineItem>(`/feed/line-items/${id}`);

const getLineItems = (params: GetLineItemsParams) =>
  RestApis.get<TransLineItem[]>(`/feed/line-items`, {
    params: withDefaultPaginationParams(params),
  });

const updateLineItem = (id: number, payload: Partial<TransLineItem>) =>
  RestApis.patch(`/feed/line-items/${id}`, payload);

const markLineItemAsRead = (id: number) => updateLineItem(id, null as any);

const createLineItemFeedback = (id: number, payload: CreateFeedbackPayload) =>
  RestApis.post(`/feedback/line-items/${id}/feedback`, payload);

export const FeedApis = {
  get,
  getList,
  getCategory,
  getCategories,
  updateCategory,
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
};
