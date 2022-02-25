/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import EventEmitter, { EventName } from '@main/EventEmitter';
import { Transaction, TranStatusType, Vendor } from '@main/entity';
import { classNames, DATE_FORMAT, formatCurrency } from '@common/utils';

import TranLineItemsList from '@main/molecules/TranLineItemsList';
import { ReactComponent as DownSmall } from '@assets/icons/outline/down-small.svg';
import { lineItemSelectState } from '@main/states/lineItems.state';
import { getTransactionColor } from '@main/utils';

export interface RollupTranRowProps {
  tran: Transaction;
  onClick?: (tran: Transaction) => void;
  onClickMessage?: () => void;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupTranRow: React.VFC<RollupTranRowProps> = ({ tran, onClick }) => {
  const viewRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const setLineItemSelect = useSetRecoilState(lineItemSelectState);
  const { lineItems = [] } = tran;

  const onClickLineItem = () => {
    if (onClick) onClick(tran);
    setOpen((pre) => !pre);
  };

  const onClickDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (lineItems.length > 0) {
      setLineItemSelect(lineItems[0]);
      EventEmitter.dispatch(EventName.SHOW_LINE_ITEM_DETAILS, {
        item: lineItems[0],
      });
    }
  };

  const renderVendorName = () => {
    return (
      <div className="flex flex-row items-center max-w-[140px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px] ml-1.5">
        <p className="text-Gray-3 text-xs font-semibold text-left truncate">{tran?.vendorName}</p>
      </div>
    );
  };

  const tranType: TranStatusType | null = useMemo(
    () => getTransactionColor(tran?.status ?? ''),
    [tran?.status],
  );
  const renderStatusTag = () => {
    return (
      <div
        className="flex flex-row justify-center items-center rounded-full bg-Green-8 ml-auto px-2.5 py-0.5 h-5 mr-2.5 min-h-[20px]"
        style={{ backgroundColor: tranType?.color?.bgColor }}
      >
        <div
          className="flex w-1.5 h-1.5 bg-Green-400 rounded-full mr-[7px]"
          style={{ backgroundColor: tranType?.color?.dotColor }}
        />
        <p
          className="text-Green-800 text-xs font-medium"
          style={{ color: tranType?.color?.textColor }}
        >
          {tranType?.displayName}
        </p>
      </div>
    );
  };

  const totalAmount: number = tran?.amount;

  return (
    <div className="flex flex-col mt-px">
      <button
        ref={viewRef}
        type="button"
        aria-hidden="true"
        className={classNames(
          'flex flex-row w-full items-center px-2 sm:px-6 py-2 bg-white hover:shadow-topCategoryHover z-10 relative border border-white hover:border-Accent-4',
        )}
        onClick={onClickLineItem}
      >
        <div className="flex w-5 h-5 justify-center items-center">
          <DownSmall className={classNames(isOpen ? 'rotate-180' : '')} />
        </div>
        {renderVendorName()}
        <p className="text-Gray-6 text-sm font-normal mx-1">·</p>
        <p className="text-Gray-6 text-xs font-normal">
          {dayjs(tran?.transDate).format(DATE_FORMAT)}
        </p>
        {renderStatusTag()}
        <p className="text-Gray-3 text-xs font-semibold w-18 text-right">
          {totalAmount === null || totalAmount === undefined
            ? 'Error'
            : `$${formatCurrency(totalAmount)}`}
        </p>
        <p
          onClick={onClickDetails}
          className="text-Gray-6 hover:text-Gray-3 text-xs font-normal underline ml-2.5 mr-4 w-8"
        >
          Details
        </p>
      </button>
      <TranLineItemsList lineItems={lineItems} isOpen={isOpen} />
    </div>
  );
};

export default RollupTranRow;
