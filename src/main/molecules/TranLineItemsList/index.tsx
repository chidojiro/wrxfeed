import React from 'react';
import clsx from 'clsx';

import { TransLineItem, Vendor } from '@/main/entity';
import Loading from '@/common/atoms/Loading';
import RollupLineItem from '@/main/molecules/RollupLineItem';
import { useLineItemDrawer } from '@/feed/useLineItemDrawer';

export interface TranLineItemsListProps {
  className?: string;
  lineItems: TransLineItem[];
  showLoadMore?: boolean;
  rollupsClass?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadMore?: boolean;
  onClickVendor?: (vendor: Vendor) => void;
  isOpen: boolean;
}

const TranLineItemsList: React.FC<TranLineItemsListProps> = ({
  className,
  rollupsClass,
  lineItems,
  showLoadMore = true,
  onLoadMore,
  hasMore = false,
  isLoadMore = false,
  onClickVendor,
  isOpen = false,
}) => {
  const { openLineItemDrawer } = useLineItemDrawer();

  const renderLoading = () => {
    if (!isLoadMore) return null;
    return (
      <div className="mb-3 sm:mb-6">
        <Loading width={16} height={16} />
      </div>
    );
  };
  const renderLoadMore = () => {
    if (!hasMore) {
      return (
        <div className="flex h-5 w-full items-center absolute left-0 right-0 -bottom-2.5">
          {/* <div className="bg-Gray-11 h-px w-auto flex-1 mx-4 sm:mx-12" /> */}
        </div>
      );
    }
    if (!showLoadMore) return null;
    return (
      <div className="flex h-5 px-4 sm:px-6 md:px-12 flex-row items-center absolute left-0 right-0 -bottom-2.5">
        <div className="bg-Gray-11 h-px w-auto flex-1" />
        <button
          onClick={onLoadMore}
          type="button"
          className="flex px-2 justify-center items-center"
        >
          <p className="text-Gray-1 text-xs font-normal">Load more</p>
        </button>
        <div className="bg-Gray-11 h-px w-auto flex-1" />
      </div>
    );
  };
  if (!isOpen) {
    return <div />;
  }
  return lineItems?.length ? (
    <div className={clsx('relative flex flex-col pb-2 transition-[height]', className ?? '')}>
      <ul className={clsx('w-full', rollupsClass ?? '')}>
        {lineItems.map((lineItem: TransLineItem) => (
          <li key={lineItem?.id}>
            <RollupLineItem
              onClick={openLineItemDrawer}
              lineItem={lineItem}
              onClickVendor={onClickVendor}
            />
          </li>
        ))}
      </ul>
      {renderLoading()}
      {renderLoadMore()}
    </div>
  ) : (
    <div className="flex w-full mt-2.5" />
  );
};

export default TranLineItemsList;
