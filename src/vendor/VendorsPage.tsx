import { VendorList } from './VendorList';
import { InfiniteLoader } from '@/common/components';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import MainLayout from '@/common/templates/MainLayout';
import * as Sentry from '@sentry/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { VendorApis } from './apis';
import { Vendor } from './types';

export const VendorsPage = Sentry.withProfiler(
  () => {
    const history = useHistory();
    const [loadedVendors, setLoadedVendors] = React.useState<Vendor[]>([]);

    const handleVendorClick = (value?: Vendor): void => {
      history.push({
        pathname: `/vendors/${value?.id.toString()}`,
      });
    };

    return (
      <MainLayout>
        <h1 className="sr-only">Vendors list</h1>
        <VendorList vendors={loadedVendors} onVendorClick={handleVendorClick} />
        <InfiniteLoader<Vendor[]>
          onLoad={(page) =>
            VendorApis.getList({
              limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
              offset: (page - 1) * DEFAULT_ITEMS_PER_INFINITE_LOAD,
            })
          }
          until={(data) => data.length < DEFAULT_ITEMS_PER_INFINITE_LOAD}
          onSuccess={(data) => setLoadedVendors((prev) => [...prev, ...data])}
        />
      </MainLayout>
    );
  },
  { name: 'VendorsPage' },
);
