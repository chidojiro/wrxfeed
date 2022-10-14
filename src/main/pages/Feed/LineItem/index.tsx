import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { TransactionFeedItemCard } from '@/feed/FeedCard/TransactionFeedItemCard';
import { MainLayout } from '@/layout/MainLayout';
import { useParams } from 'react-router-dom';

export const LineItemPage = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const {
    data: feed = EMPTY_ARRAY,
    isInitializing,
    isValidating,
  } = useFetcher(['feedLineItems', params], () => FeedApis.getTransactionFeedItem(id));

  const innerRender = () => {
    if (isInitializing) return <RestrictedAccessPage />;
    return <TransactionFeedItemCard feed={feed?.[0]} loading={isValidating} />;
  };

  return <MainLayout>{innerRender()}</MainLayout>;
};
