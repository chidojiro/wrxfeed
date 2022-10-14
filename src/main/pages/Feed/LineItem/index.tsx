import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { useFetcher } from '@/common/hooks';
import { ApiErrorCode } from '@/error';
import { FeedApis } from '@/feed/apis';
import { fallbackFeed } from '@/feed/constants';
import { TransactionFeedItemCard } from '@/feed/FeedCard/TransactionFeedItemCard';
import { MainLayout } from '@/layout/MainLayout';
import ListLoading from '@/main/atoms/ListLoading';
import { useParams } from 'react-router-dom';

export const LineItemPage = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const {
    data: feed = fallbackFeed,
    isInitializing,
    isValidating,
    error,
  } = useFetcher(['feedLineItems', params], () => FeedApis.get(id));

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  const innerRender = () => {
    if (isInitializing) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <ListLoading />
        </div>
      );
    }
    if (isForbidden) return <RestrictedAccessPage />;
    return <TransactionFeedItemCard feed={feed} loading={isValidating} />;
  };

  return <MainLayout>{innerRender()}</MainLayout>;
};
