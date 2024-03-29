import { Button } from '@/common/components';
import { useIntersection } from '@/common/hooks';
import { REMOVE_LINE_ITEM_NEW_STATE_TIMEOUT } from '@/config';
import { FeedApis } from '@/feed/apis';
import { TransLineItem } from '@/main/entity';
import { decimalLogic, DecimalType, getVendorNameFromLineItem } from '@/main/utils';
import { Vendor } from '@/vendor/types';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useLineItemDrawer } from '../LineItemDrawer';

export type TransactionLineItemProps = {
  lineItem: TransLineItem;
  onClick?: (lineItem: TransLineItem) => void;
  onClickVendor?: (vendor: Vendor) => void;
};

export const TransactionLineItem = ({ lineItem, onClick }: TransactionLineItemProps) => {
  const viewRef = useRef<HTMLButtonElement>(null);
  const isVisible = useIntersection(viewRef.current || undefined, '0px');

  const { selectedLineItem } = useLineItemDrawer();

  const [isRead, setRead] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        setRead(true);
      }, REMOVE_LINE_ITEM_NEW_STATE_TIMEOUT);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible]);

  useEffect(() => {
    if (lineItem?.meta?.isRead === false) {
      FeedApis.markLineItemAsRead(lineItem?.id);
    }
  }, [lineItem?.id, lineItem?.meta?.isRead]);

  const renderGreenDot = () => {
    if (lineItem?.meta?.isRead === false && isRead === false) {
      return <div className="flex w-1 h-1 rounded-full bg-Green-4 mr-1.5" />;
    }
    return <div className="flex w-1 h-1 rounded-full mr-1.5" />;
  };

  const onClickLineItem: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // prevent close line item drawer
    e.stopPropagation();

    if (onClick) onClick(lineItem);
    setRead(true);
    FeedApis.markLineItemAsRead(lineItem?.id);
  };

  const renderVendorName = () => {
    const vendorName = getVendorNameFromLineItem(lineItem);
    return (
      <div className="flex flex-row items-center max-w-[140px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px]">
        <p className="text-Gray-6 text-xs font-normal text-left truncate">{vendorName}</p>
      </div>
    );
  };

  const isItemShowing = selectedLineItem?.id === lineItem?.id;
  const bgColor = isItemShowing ? 'bg-Gray-12' : 'bg-transparent';

  return (
    <Button
      ref={viewRef}
      aria-hidden="true"
      className={clsx(
        'flex flex-row w-full items-center px-2 sm:px-10 py-1 min-h-[24px] hover:bg-Gray-12 z-10 relative mt-0.5',
        bgColor,
      )}
      onClick={onClickLineItem}
    >
      {renderGreenDot()}
      {renderVendorName()}
      <p className="text-Gray-6 text-xs font-normal ml-auto mr-11">
        {lineItem?.amountUsd === null || lineItem?.amountUsd === undefined
          ? 'Error'
          : `${decimalLogic(lineItem?.amountUsd, DecimalType.DetailView, '$')}`}
      </p>
    </Button>
  );
};
