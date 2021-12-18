/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import VendorList from '@main/organisms/VendorList';
import { FeedFilters, Pagination } from '@api/types';
import { useVendor } from '@main/hooks/vendor.hook';
import { FilterKeys } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { Category, Department, Vendor } from '@main/entity';
import { MainGroups } from '@common/constants';
import { useQuery } from '@common/hooks';
import FeedList from '@main/organisms/FeedList';
import { useFeed } from '@main/hooks/feed.hook';
import { useApi } from '@api';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const VendorsPage: React.VFC = () => {
  const history = useHistory();
  const { id: vendorId } = useParams<{ id?: string }>();
  const { getVendorById } = useApi();
  const query = useQuery();
  const location = useLocation();
  // Vendors states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { vendors, hasMore, isLoading } = useVendor(filter);
  const [vendor, setVendor] = useState<Vendor | null>();
  // Feeds states
  const [feedsFilter, setFeedsFilter] = useState<FeedFilters>(
    vendorId
      ? {
          page: INIT_PAGINATION,
          vendor: parseInt(vendorId, 10),
          forYou: 0,
        }
      : {
          page: { offset: 0, limit: 0 }, // Don't load feed at the first launch
          forYou: 0,
        },
  );

  const {
    feeds,
    hasMore: hasMoreFeeds,
    isLoading: feedsLoading,
    updateCategory,
    cleanData,
  } = useFeed(feedsFilter);
  // Variables
  const isFiltering = !!feedsFilter.vendor;

  const getFilterVendorById = async (venId: string) => {
    const venById = await getVendorById(parseInt(venId, 10));
    setVendor(venById);
  };

  const filterByRoute = useCallback(() => {
    if (vendorId) {
      const newFilter: { [key: string]: string | number | Pagination | null } = {
        page: INIT_PAGINATION,
        vendor: parseInt(vendorId, 10),
      };
      FilterKeys.forEach((key) => {
        if (query.get(key)) {
          newFilter[key] = query.get(key);
        }
      });
      setFeedsFilter(newFilter);
      getFilterVendorById(vendorId);
    } else {
      setFeedsFilter({ page: { offset: 0, limit: 0 } }); // Clean up transaction
    }
  }, [vendorId, query.toString(), feedsFilter.vendor]);

  useEffect(() => {
    filterByRoute();
  }, [filterByRoute]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const handleFeedsLoadMore = useCallback(() => {
    if (!hasMoreFeeds || feedsLoading) return;
    setFeedsFilter((prevFilter) => ({
      ...prevFilter,
      page: {
        limit: prevFilter?.page?.limit ?? LIMIT,
        offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? LIMIT),
      },
    }));
  }, [hasMoreFeeds, feedsLoading]);

  const handleVendorSelect = (value?: Vendor): void => {
    cleanData();
    setVendor(value);
    history.push({
      pathname: `/vendors/${value?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };

  const handleFeedsFilter = (
    key: keyof FeedFilters,
    value?: Department | Category | Vendor,
  ): void => {
    query.set(key, value?.id.toString() ?? '');
    history.push({
      pathname: location.pathname,
      search: query.toString(),
    });
  };

  const clearFilter = (): void => {
    history.push('/vendors');
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center space-x-4">
            <ChevronLeftIcon onClick={clearFilter} />
            <h1 className="text-Gray-1 text-xl font-bold">{vendor?.name}</h1>
          </div>
        </div>
      )}
      {!isFiltering ? (
        <VendorList
          vendors={vendors}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={handleVendorSelect}
        />
      ) : (
        <FeedList
          feeds={feeds}
          isLoading={feedsLoading || isLoading}
          hasMore={hasMoreFeeds}
          onLoadMore={handleFeedsLoadMore}
          onFilter={handleFeedsFilter}
          updateCategory={updateCategory}
        />
      )}
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default Sentry.withProfiler(VendorsPage, { name: 'VendorsPage' });
