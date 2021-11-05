import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Vendor } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';

interface VendorListProps {
  vendors: Vendor[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Vendor) => void;
}

const VendorList: React.VFC<VendorListProps> = ({ vendors, isLoading, onLoadMore, onSelect }) => {
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
              <div
                aria-hidden="true"
                className="cursor-pointer w-full"
                onClick={() => onSelect && onSelect(vendor)}
                onKeyDown={() => onSelect && onSelect(vendor)}
              >
                <p className="ml-3 text-sm font-medium text-Gray-1">{vendor.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InfiniteScroller>
  );
};

export default VendorList;
