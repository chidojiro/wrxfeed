import React, { useEffect } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Vendor } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import DirectoryItem from '@main/molecules/DirectoryItem';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@identity/hooks';

interface VendorListProps {
  vendors: Vendor[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Vendor) => void;
}

const VendorList: React.VFC<VendorListProps> = ({ vendors, isLoading, onLoadMore, onSelect }) => {
  const identity = useIdentity();

  useEffect(() => {
    mixpanel.track('Vendor Directory View', {
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 space-y-10 overflow-hidden"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="flex flex-col space-y-6 px-0.5">
        {vendors.map((vendor) => (
          <li key={vendor.id} className="">
            <DirectoryItem
              item={vendor}
              onClick={() => onSelect && onSelect(vendor)}
              itemType="vendors"
            />
          </li>
        ))}
      </ul>
    </InfiniteScroller>
  );
};

export default VendorList;
