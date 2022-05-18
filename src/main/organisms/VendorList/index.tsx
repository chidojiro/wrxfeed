import React, { useEffect } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Vendor } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import DirectoryItem from '@main/molecules/DirectoryItem';
import { useSubscription } from '@main/hooks/subscription.hook';

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
  const { subscribe, unsubscribe, isFollowing } = useSubscription();

  const identity = useIdentity();

  useEffect(() => {
    mixpanel.track('Vendor Directory View', {
      source: 'Vendor Directory View',
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
  }, []);

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 space-y-10 overflow-hidden"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-sm">
        <ul className="divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <li key={vendor.id} className="px-4 py-4 sm:px-6">
              <DirectoryItem
                item={vendor}
                onClick={() => onSelect && onSelect(vendor)}
                isFollowing={isFollowing('vendors', vendor)}
                onFollow={() => subscribe('vendors', vendor)}
                onUnfollow={() => unsubscribe('vendors', vendor)}
              />
            </li>
          ))}
        </ul>
      </div>
    </InfiniteScroller>
  );
};

export default VendorList;
