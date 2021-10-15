import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Vendor } from '@main/entity';
import TransactionLoading from '@main/atoms/TransactionLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

interface VendorListProps {
  vendors: Vendor[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Vendor) => void;
}

const VendorList: React.VFC<VendorListProps> = ({
  vendors,
  isLoading,
  onLoadMore,
  hasMore,
  onSelect,
}) => {
  return (
    <InfiniteScroller
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'scroll',
        paddingTop: 52,
        paddingBottom: 52,
        marginRight: 2,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<TransactionLoading />}
    >
      <ul className="pb-4 divide-y divide-Gray-8 rounded-sm">
        {vendors.map((vendor) => (
          <li key={vendor.id} className="flex bg-white">
            <div
              aria-hidden="true"
              className="py-4 cursor-pointer w-full"
              onClick={() => onSelect && onSelect(vendor)}
              onKeyDown={() => onSelect && onSelect(vendor)}
            >
              <p className="ml-3 text-sm font-medium text-Gray-1">{vendor.name}</p>
            </div>
          </li>
        ))}
      </ul>
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default VendorList;
