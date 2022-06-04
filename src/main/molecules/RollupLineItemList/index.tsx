// import { MessageTextAlt } from '@assets/index';
import { classNames } from '@common/utils';
import React from 'react';
import { TransLineItem, Vendor } from '@main/entity';
import Loading from '@common/atoms/Loading';
import RollupLineItem from '../RollupLineItem';

export interface RollupLineItemListProps {
  className?: string;
  lineItems?: TransLineItem[];
  showLoadMore?: boolean;
  rollupsClass?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadMore?: boolean;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupLineItemList: React.VFC<RollupLineItemListProps> = ({
  className,
  rollupsClass,
  lineItems,
  showLoadMore = true,
  onLoadMore,
  hasMore = false,
  isLoadMore = false,
  onClickVendor,
}) => {
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
          <div className="bg-Gray-11 h-px w-auto flex-1 mx-4 sm:mx-12" />
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
  return lineItems?.length ? (
    <div className={classNames('relative flex flex-col', className ?? '')}>
      <ul className={classNames('w-full py-2 sm:py-4', rollupsClass ?? '')}>
        {lineItems.map((lineItem) => (
          <li key={lineItem?.id}>
            <RollupLineItem lineItem={lineItem} onClickVendor={onClickVendor} />
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

export default RollupLineItemList;