/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { useHistory, useParams } from 'react-router-dom';
import RollupCard from '@main/molecules/RollupCard';
import { FeedItem } from '@main/entity';
import { useApi } from '@api';
import { isBadRequest } from '@error/utils';
import { useErrorHandler } from 'react-error-boundary';
import { toast } from 'react-toastify';
import Loading from '@common/atoms/Loading';

const FeedPage: React.VFC = () => {
  const history = useHistory();
  const ApiClient = useApi();
  const { id: feedId } = useParams<{ id: string }>();
  const [feedItem, setFeedItem] = React.useState<FeedItem | undefined>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const getFeedItem = async (id: number) => {
    try {
      setLoading(true);
      const res = await ApiClient.getFeedItemById(id);
      setFeedItem(res);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get this rollups 🤦!');
      } else {
        errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getFeedItem(parseInt(feedId, 10));
  }, [feedId]);

  const onClickGoBack = (): void => {
    history.push('/notifications');
  };

  const renderFeed = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 w-full h-[300px] justify-center items-center">
          <Loading width={60} height={60} />
        </div>
      );
    }

    if (!feedItem) {
      return (
        <div className="flex flex-1 w-full h-[300px] justify-center items-center px-16">
          <span className="flex text-2xl text-Gray-1 font-semibold text-center">
            An error occurred loading this item 😞
            <br />
            please try again later!
          </span>
        </div>
      );
    }

    return (
      <div className="w-full h-full overflow-scroll hide-scrollbar">
        <ul>
          <RollupCard feedItem={feedItem} />
        </ul>
      </div>
    );
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Rollups</h1>
      <div className="flex items-center space-x-4 pb-8 pl-4 sm:pl-0">
        <ChevronLeftIcon onClick={onClickGoBack} />
        <h1 className="text-Gray-1 text-xl font-bold">Notifications</h1>
      </div>
      {renderFeed()}
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default FeedPage;
