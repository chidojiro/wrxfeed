import { useFetcher, UseFetcherConfiguration } from '@/common/hooks';
import { FeedApis } from './apis';
import { GetFeedsParams } from './types';

export const useFeeds = (params: GetFeedsParams = {}, configs: UseFetcherConfiguration) =>
  useFetcher(['feeds', params], () => FeedApis.getList(params), configs);
