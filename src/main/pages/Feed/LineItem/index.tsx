import { ApiErrorCode, isApiError, useErrorHandler } from '@/error';
import { FeedApis } from '@/feed/apis';
import { TransactionFeedItemCard } from '@/feed/FeedCard/TransactionFeedItemCard';
import { MainLayout } from '@/layout/MainLayout';
import { FeedItem } from '@/main/entity';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const INITIAL_COMMENTS = 2;

export const LineItemPage = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [lineItem, setLineItem] = useState<FeedItem>();
  const history = useHistory();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState<boolean>(false);

  const getFeedLineItem = useCallback(async () => {
    try {
      setLoading(true);
      const res = await FeedApis.getTransactionFeedItem(id);
      if (res.length > 0) {
        setLineItem(res[0]);
      }
    } catch (error: unknown) {
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.Notfound) {
          history.push('/404');
        } else {
          toast.error(error.details?.message);
          errorHandler(error);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [errorHandler, history, id]);

  useEffect(() => {
    getFeedLineItem();
  }, [getFeedLineItem]);

  return (
    <MainLayout>
      <TransactionFeedItemCard id={id} feed={lineItem as FeedItem} loading={isLoading} />
    </MainLayout>
  );
};
