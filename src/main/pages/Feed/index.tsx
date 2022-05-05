/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { useHistory, useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { toast } from 'react-toastify';

import { useQuery } from '@common/hooks';
import { useApi } from '@api';
import { ApiErrorCode } from '@error/types';
import { MainGroups } from '@common/constants';
import { isApiError } from '@error/utils';
import { Category, Department, FeedItem, Vendor } from '@main/entity';

import MainLayout from '@common/templates/MainLayout';
import RollupCard from '@main/molecules/RollupCard';
import Loading from '@common/atoms/Loading';
import TargetFeedItem from '@main/molecules/TargetFeedItem';

const FeedPage: React.VFC = () => {
  const history = useHistory();
  const ApiClient = useApi();
  const query = useQuery();
  const { id: feedId } = useParams<{ id: string }>();
  const [feedItem, setFeedItem] = useState<FeedItem | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();
  const route = query.get('route');

  const getFeedItem = async (id: number) => {
    try {
      setLoading(true);
      const res = await ApiClient.getFeedItemById(id);
      setFeedItem(res);
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
  };

  useEffect(() => {
    getFeedItem(parseInt(feedId, 10));
  }, [feedId, route]);

  const onClickCategory = (category?: Category) => {
    history.push({
      pathname: `/categories/${category?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };
  const onClickDepartment = (department?: Department) => {
    history.push({
      pathname: `/departments/${department?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };
  const onClickRootDept = (rootDept?: Department) => {
    history.push({
      pathname: `/departments/${rootDept?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };
  const onClickVendor = (vendor?: Vendor) => {
    history.push({
      pathname: `/vendors/${vendor?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
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
        {feedItem.type === 'transactions' ? (
          <RollupCard
            onClickCategory={onClickCategory}
            onClickDepartment={onClickDepartment}
            onClickRootDept={onClickRootDept}
            onClickVendor={onClickVendor}
            feedItem={feedItem}
          />
        ) : (
          <TargetFeedItem feedItem={feedItem} />
        )}
      </div>
    );
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Rollups</h1>
      {renderFeed()}
    </MainLayout>
  );
};

export default Sentry.withProfiler(FeedPage, { name: 'FeedPage' });
