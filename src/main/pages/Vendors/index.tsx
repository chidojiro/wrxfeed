/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useApi } from '@api';
import { useQuery } from '@common/hooks';
import { useVendor } from '@main/hooks/vendor.hook';
import { FilterKeys } from '@main/hooks';

import { FeedFilters, Pagination } from '@api/types';
import { Category, Department, Vendor } from '@main/entity';
import { MainGroups } from '@common/constants';
import { scrollToTop } from '@main/utils';

import FeedList from '@main/organisms/FeedList';
import MainLayout from '@common/templates/MainLayout';
import VendorList from '@main/organisms/VendorList';
import { ChevronLeftIcon } from '@assets';

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

  const handleVendorSelect = (value?: Vendor): void => {
    setVendor(value);
    history.push({
      pathname: `/vendors/${value?.id.toString()}`,
      search: `?route=${MainGroups.Following}`,
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
    scrollToTop();
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
          onFilter={handleFeedsFilter}
          vendorId={vendorId ? parseInt(vendorId, 10) : undefined}
        />
      )}
    </MainLayout>
  );
};

export default Sentry.withProfiler(VendorsPage, { name: 'VendorsPage' });
