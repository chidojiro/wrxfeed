/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useApi } from '@api';
import { useIntersection } from '@common/hooks';

import EventEmitter, { EventName } from '@main/EventEmitter';
import { TransLineItem, Vendor } from '@main/entity';
import { classNames } from '@common/utils';
import { decimalLogic, DecimalType, getVendorNameFromLineItem } from '@main/utils';
import { REMOVE_LINE_ITEM_NEW_STATE_TIMEOUT } from '@src/config';

import { lineItemSelectState } from '@main/states/lineItems.state';
import { slideOverOpenState } from '@main/states/slideOver.state';

export interface RollupLineItemProps {
  lineItem: TransLineItem;
  onClick?: (lineItem: TransLineItem) => void;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupLineItem: React.VFC<RollupLineItemProps> = ({ lineItem, onClick }) => {
  const viewRef = useRef<HTMLButtonElement>(null);
  const isVisible = useIntersection(viewRef.current || undefined, '0px');
  const { maskLineItemAsRead } = useApi();

  const [lineItemSelect, setLineItemSelect] = useRecoilState(lineItemSelectState);
  const slideOverOpened = useRecoilValue(slideOverOpenState);

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
      maskLineItemAsRead(lineItem?.id);
    }
  }, [lineItem?.id, lineItem?.meta?.isRead, maskLineItemAsRead]);

  const renderGreenDot = () => {
    if (lineItem?.meta?.isRead === false && isRead === false) {
      return <div className="flex w-1 h-1 rounded-full bg-Green-4 mr-1.5" />;
    }
    return <div className="flex w-1 h-1 rounded-full mr-1.5" />;
  };

  // const onClickLineItemVendor = (event: React.MouseEvent<HTMLElement>) => {
  //   event.stopPropagation();
  //   if (onClickVendor && lineItem.vendor) {
  //     onClickVendor(lineItem.vendor);
  //   }
  // };

  const onClickLineItem = () => {
    if (onClick) onClick(lineItem);
    setLineItemSelect(lineItem);
    setRead(true);
    maskLineItemAsRead(lineItem?.id);
    EventEmitter.dispatch(EventName.SHOW_LINE_ITEM_DETAILS, {
      item: lineItem,
    });
  };

  const renderVendorName = () => {
    const vendorName = getVendorNameFromLineItem(lineItem);
    return (
      <div className="flex flex-row items-center max-w-[140px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px]">
        <p className="text-Gray-6 text-xs font-normal text-left truncate">{vendorName}</p>
      </div>
    );
  };

  const isItemShowing = slideOverOpened && lineItemSelect?.id === lineItem?.id;
  const bgColor = isItemShowing ? 'bg-Gray-12' : 'bg-transparent';

  return (
    <button
      ref={viewRef}
      type="button"
      aria-hidden="true"
      className={classNames(
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
    </button>
  );
};

export default RollupLineItem;
