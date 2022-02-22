/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Vendor } from '@main/entity';
import { classNames, DATE_FORMAT, formatCurrency } from '@common/utils';

import { lineItemSelectState } from '@main/states/lineItems.state';
import { slideOverOpenState } from '@main/states/slideOver.state';

import { ReactComponent as DownSmall } from '@assets/icons/outline/down-small.svg';
import TranLineItemsList from '../TranLineItemsList';

export interface RollupTranRowProps {
  tran: number;
  onClick?: (tran: number) => void;
  onClickMessage?: () => void;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupTranRow: React.VFC<RollupTranRowProps> = ({ tran, onClick }) => {
  const viewRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [tranSelect] = useRecoilState(lineItemSelectState);
  const slideOverOpened = useRecoilValue(slideOverOpenState);

  const onClickLineItem = () => {
    if (onClick) onClick(tran);
    setOpen((pre) => !pre);
  };

  const renderVendorName = () => {
    return (
      <div className="flex flex-row items-center max-w-[140px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px] ml-1.5">
        <p className="text-Gray-3 text-xs font-semibold text-left truncate">
          Amazon Business EU S.à.r.l
        </p>
      </div>
    );
  };

  const renderTag = () => {
    return (
      <div className="flex flex-row justify-center items-center rounded-full bg-Green-8 ml-auto px-2.5 py-0.5 h-5 mr-2.5">
        <div className="flex bg-Green-400 rounded-full mr-[7px]" />
        <p className="text-Green-800 text-xs font-medium">Paid</p>
      </div>
    );
  };

  const isItemShowing = slideOverOpened && tranSelect?.id === 1;
  const bgColor = isItemShowing ? 'bg-Gray-12' : 'bg-transparent';
  const totalAmount: number | undefined | null = 1788.69;

  return (
    <div className="flex flex-col mt-px">
      <button
        ref={viewRef}
        type="button"
        aria-hidden="true"
        className={classNames(
          'flex flex-row w-full items-center px-2 sm:px-6 py-2 bg-white hover:shadow-topCategoryHover z-10 relative border border-white hover:border-Accent-4',
          bgColor,
        )}
        onClick={onClickLineItem}
      >
        <div className="flex w-5 h-5 justify-center items-center">
          <DownSmall className={classNames(isOpen ? 'rotate-180' : '')} />
        </div>
        {renderVendorName()}
        <p className="text-Gray-6 text-sm font-normal mx-1">·</p>
        <p className="text-Gray-6 text-xs font-normal">{dayjs('11-12-2022').format(DATE_FORMAT)}</p>
        {renderTag()}
        <p className="text-Gray-3 text-xs font-semibold w-18 text-right">
          {totalAmount === null || totalAmount === undefined
            ? 'Error'
            : `$${formatCurrency(totalAmount)}`}
        </p>
        <p className="text-Gray-6 hover:text-Gray-3 text-xs font-normal underline ml-2.5 mr-4 w-8">
          Details
        </p>
      </button>
      <TranLineItemsList tran={tran} isOpen={isOpen} />
    </div>
  );
};

export default RollupTranRow;
