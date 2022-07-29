import { InfiniteLoader } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { VendorApis } from './apis';
import { Vendor } from './types';
import { VendorList } from './VendorList';

export const VendorsPage = () => {
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
        onLoad={(paginationParams) => VendorApis.getList(paginationParams)}
        onSuccess={(data) => setLoadedVendors((prev) => [...prev, ...data])}
      />
    </MainLayout>
  );
};
