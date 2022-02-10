/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { MessageTextAlt } from '@assets/index';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import { TransLineItem, Vendor } from '@main/entity';
import EventEmitter, { EventName } from '@main/EventEmitter';
import { classNames, DATE_FORMAT, formatCurrency } from '@common/utils';

import { useApi } from '@api';
import { lineItemSelectState } from '@main/states/lineItems.state';
import { slideOverOpenState } from '@main/states/slideOver.state';

import { ReactComponent as MessageTextAlt } from '@assets/icons/solid/message-text-alt.svg';
import { getVendorNameFromLineItem } from '@main/utils';
import { REMOVE_LINE_ITEM_NEW_STATE_TIMEOUT } from '@src/config';
import { useVisibility } from '@common/hooks/useVisibility';

export interface RollupLineItemProps {
  lineItem: TransLineItem;
  onClick?: (lineItem: TransLineItem) => void;
  onClickMessage?: () => void;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupLineItem: React.VFC<RollupLineItemProps> = ({
  lineItem,
  onClick,
  onClickMessage,
  onClickVendor,
}) => {
  const [isVisible, refVisible] = useVisibility<HTMLButtonElement>(0);
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

  const renderMessages = () => {
    const isShowMessage = false;
    if (isShowMessage) {
      return (
        <button onClick={onClickMessage} type="button" className="flex h-4 w-8 flex-row ml-4">
          <MessageTextAlt className="fill-current text-Gray-6 opacity-25" />
          <p className="text-Gray-6 text-xs font-medium ml-1">{lineItem?.accountId}</p>
        </button>
      );
    }
    return <div className="h-4 w-8 ml-4" />;
  };

  const renderGreenDot = () => {
    if (lineItem?.meta?.isRead === false && isRead === false) {
      return <div className="flex w-1 h-1 rounded-full bg-Green-4 mr-1.5" />;
    }
    return <div className="flex w-1 h-1 rounded-full mr-1.5" />;
  };

  const onClickLineItemVendor = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (onClickVendor && lineItem.vendor) {
      onClickVendor(lineItem.vendor);
    }
  };

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
      <div
        className="hover:underline flex flex-row items-center max-w-[140px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px]"
        onClick={onClickLineItemVendor}
      >
        <p className="text-Gray-6 text-xs font-semibold text-left truncate">{vendorName}</p>
      </div>
    );
  };

  const isItemShowing = slideOverOpened && lineItemSelect?.id === lineItem?.id;
  const bgColor = isItemShowing ? 'bg-Gray-12' : 'bg-transparent';

  return (
    <button
      ref={refVisible}
      type="button"
      aria-hidden="true"
      className={classNames(
        'flex flex-row w-full items-center pl-2 sm:pl-10 pr-2 sm:pr-2 py-1.5 hover:bg-Gray-12 z-10 relative',
        bgColor,
      )}
      onClick={onClickLineItem}
    >
      {renderGreenDot()}
      {renderVendorName()}
      <p className="text-Gray-6 text-sm font-normal mx-0.5">·</p>
      <p className="text-Gray-6 text-xs font-normal">
        {dayjs(lineItem?.transDate).format(DATE_FORMAT)}
      </p>
      <p className="text-Gray-6 text-xs font-semibold ml-auto">
        {lineItem?.amountUsd === null || lineItem?.amountUsd === undefined
          ? 'Error'
          : `$${formatCurrency(lineItem?.amountUsd)}`}
      </p>
      {renderMessages()}
    </button>
  );
};

export default RollupLineItem;
