import { FeedFilters } from '@/api/types';
import { ChevronLeftIcon } from '@/assets';
import { ListLoader } from '@/common/components';
import { useQuery } from '@/common/hooks';
import MainLayout from '@/common/templates/MainLayout';
import { Category, Department } from '@/main/entity';
import FeedList from '@/main/organisms/FeedList';
import * as Sentry from '@sentry/react';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Vendor } from './types';
import { useVendor } from './useVendor';

export const VendorPage = Sentry.withProfiler(
  () => {
    const history = useHistory();
    const query = useQuery();

    const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
    const vendorId = +vendorIdParam;

    const goBack = () => {
      history.push('/vendors');
    };

    const { data: vendor, isValidating } = useVendor(vendorId, { onError: goBack });

    const handleFeedsFilter = (
      key: keyof FeedFilters,
      value?: Department | Category | Vendor,
    ): void => {
      query.set(key, value?.id.toString() ?? '');
    };

    return (
      <MainLayout>
        <h1 className="sr-only">Department list</h1>
        <Link to="/vendors" className="flex flex-1 items-center space-x-4 mb-8">
          <ChevronLeftIcon />
          <h1 className="text-Gray-1 text-xl font-bold">{vendor?.name ?? '...'}</h1>
        </Link>
        <ListLoader loading={isValidating}>
          <FeedList onFilter={handleFeedsFilter} vendorId={vendorId} />
        </ListLoader>
      </MainLayout>
    );
  },
  { name: 'VendorPage' },
);
