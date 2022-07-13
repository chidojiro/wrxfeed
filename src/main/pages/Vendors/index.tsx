/* eslint-disable react-hooks/exhaustive-deps */
import * as Sentry from '@sentry/react';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FeedFilters } from '@/api/types';
import { ChevronLeftIcon } from '@/assets';
import { MainGroups } from '@/common/constants';
import { useFetcher, useLegacyQuery } from '@/common/hooks';
import MainLayout from '@/common/templates/MainLayout';
import { FeedApis } from '@/feed/apis';
import { Category, Department, Vendor } from '@/main/entity';
import { useVendor } from '@/main/hooks/vendor.hook';
import FeedList from '@/main/organisms/FeedList';
import VendorList from '@/main/organisms/VendorList';
import { scrollToTop } from '@/main/utils';
import { PaginationParams } from '@/rest/types';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const VendorsPage: React.FC = () => {
  const history = useHistory();
  const { id: vendorId } = useParams<{ id?: string }>();
  const [vendor, setVendor] = React.useState<Vendor | null>();

  const query = useLegacyQuery();
  const location = useLocation();

  const [filter, setFilter] = React.useState<PaginationParams>(INIT_PAGINATION);
  const { vendors, hasMore, isLoading } = useVendor(filter);

  const handleLoadMoreVendor = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  useFetcher(
    vendorId && !isNaN(+vendorId) && ['vendor', vendorId],
    () => FeedApis.getVendor(parseInt(vendorId ?? '0', 10)),
    {
      onSuccess: setVendor,
    },
  );

  React.useEffect(() => {
    setVendor(null);
  }, [vendorId]);

  const handleSelectVendor = (value?: Vendor): void => {
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
      {vendorId && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center space-x-4">
            <ChevronLeftIcon onClick={clearFilter} />
            <h1 className="text-Gray-1 text-xl font-bold">{vendor?.name ?? '...'}</h1>
          </div>
        </div>
      )}
      {!vendorId && (
        <VendorList
          vendors={vendors}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMoreVendor}
          onSelect={handleSelectVendor}
        />
      )}
      {vendorId && !isNaN(+vendorId) && (
        <FeedList onFilter={handleFeedsFilter} vendorId={parseInt(vendorId, 10)} />
      )}
    </MainLayout>
  );
};

export default Sentry.withProfiler(VendorsPage, { name: 'VendorsPage' });
