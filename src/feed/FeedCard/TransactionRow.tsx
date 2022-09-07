import { ReactComponent as DownSmall } from '@/assets/icons/outline/down-small.svg';
import { Button } from '@/common/components';
import { DATE_FORMAT } from '@/common/utils';
import { Transaction, TransLineItem, TranStatusType } from '@/main/entity';
import { TransactionLineItems } from './TransactionLineItems';
import { decimalLogic, DecimalType, getTransactionStatus } from '@/main/utils';
import { Vendor } from '@/vendor/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

export type TransactionRowProps = {
  tran: Transaction;
  onClick?: (tran: Transaction) => void;
  onClickMessage?: () => void;
  onClickVendor?: (vendor: Vendor) => void;
  onView: (item: TransLineItem) => void;
};

const A_WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

export const TransactionRow = ({ tran, onClick, onView }: TransactionRowProps) => {
  const viewRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const { lineItems = [] } = tran;

  const onClickLineItem: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // prevent close line item drawer
    e.stopPropagation();

    if (onClick) onClick(tran);
    setOpen((pre) => !pre);
  };

  const onClickDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (lineItems.length > 0) {
      onView(lineItems[0]);
    }
  };

  const tranType: TranStatusType | null = React.useMemo(
    () => getTransactionStatus(tran?.status ?? ''),
    [tran?.status],
  );
  const totalAmount: number = tran?.amountUsd;

  const renderExpensedTag = () => {
    if (tran.recordType?.toLowerCase() === 'Expense Report'.toLowerCase()) {
      return (
        <div className="flex flex-row items-center space-x-1">
          <p className="text-Gray-6 text-sm font-normal">·</p>
          <p className="text-Accent-2 text-xs font-normal">Expensed</p>
        </div>
      );
    }
    return null;
  };

  const renderDateTag = () => {
    return (
      <div className="flex flex-row items-center space-x-1">
        <p className="text-Gray-6 text-sm font-normal">·</p>
        <p className="text-Gray-6 text-xs font-normal">
          {dayjs(tran?.transDate).format(DATE_FORMAT)}
        </p>
      </div>
    );
  };

  const renderUnreadIndicator = () => {
    if (tran?.transDate && Date.now() - Date.parse(tran?.transDate) <= A_WEEK_IN_MILLISECONDS) {
      return <div className="flex w-1.5 h-1.5 bg-Green-400 rounded-full" />;
    }

    return null;
  };

  return (
    <div className="flex flex-col mt-px w-auto overflow-hidden">
      <Button
        ref={viewRef}
        aria-hidden="true"
        className={clsx(
          'flex flex-row w-full items-center px-2 sm:px-6 py-2 bg-white hover:shadow-top-category-hover z-10 relative border border-white hover:border-Accent-4',
        )}
        onClick={onClickLineItem}
      >
        <div className="flex w-5 h-5 justify-center items-center">
          <DownSmall className={clsx(isOpen ? 'rotate-180' : '')} />
        </div>
        {renderUnreadIndicator()}
        <div className="flex flex-1 h-5 overflow-hidden flex-row items-center mx-1.5 space-x-1">
          <Link
            to={`/vendors/${tran?.vendor.id}`}
            className="text-Gray-3 text-xs font-semibold text-left truncate hover:underline"
          >
            {tran?.vendorName}
          </Link>
          {renderExpensedTag()}
          {renderDateTag()}
        </div>
        <div
          className="flex flex-row justify-center items-center rounded-full bg-Green-8 px-2.5 py-0.5 h-5 mr-2.5 min-h-[20px]"
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
        <p className="text-Gray-3 text-xs font-semibold w-18 text-right">
          {totalAmount === null || totalAmount === undefined
            ? 'Error'
            : `${decimalLogic(totalAmount, DecimalType.DetailView, '$')}`}
        </p>
        <p
          onClick={onClickDetails}
          className={clsx(
            'hidden text-Gray-6 hover:text-Gray-3 text-xs font-normal underline ml-2.5 mr-4 w-8',
            'md: block',
          )}
        >
          Details
        </p>
      </Button>
      <TransactionLineItems lineItems={lineItems} isOpen={isOpen} />
    </div>
  );
};
