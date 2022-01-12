/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Menu } from '@headlessui/react';

import { FeedBackType } from '@main/types';
import { isEmptyOrSpaces } from '@main/utils';
import { TransLineItem } from '@main/entity';
import { classNames, formatCurrency } from '@common/utils';

import Loading from '@common/atoms/Loading';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/organisms/FeedBackModal';

import { ReactComponent as MoreVertical } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x.svg';

export interface LineItemDetailsProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  item: TransLineItem;
}

export interface SelectItemProps {
  item: TransLineItem;
}

export type LineInfo = {
  id: string;
  key: string;
  value: string;
};

const LineItemDetails: React.VFC<LineItemDetailsProps> = ({
  className = '',
  setOpen,
  loading,
  item,
}) => {
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);

  const getOriginalAmountWithSign = (): string => {
    if (!item?.transaction?.currency || !item?.amountFx) return '...';
    const amountWithCurrency = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: item?.transaction?.currency || '',
    }).format(item?.amountFx || 0);
    return amountWithCurrency;
  };

  const rows: LineInfo[] = [
    {
      id: 'date',
      key: 'Date',
      value: dayjs(item?.transDate).format('MMM D, YYYY'),
    },
    {
      id: 'original-amount',
      key: 'Amount',
      value: getOriginalAmountWithSign(),
    },
    {
      id: 'converted-amount',
      key: 'Amount USD',
      value: `$${formatCurrency(item?.amountUsd)}`,
    },
    // {
    //   key: 'Last Modified',
    //   value: `${dayjs(item?.endDate).format('MM/D/YYYY h:mmA')} PST`,
    // },
    {
      id: 'subsidiary-name',
      key: 'Subsidiary',
      value: item?.transaction?.subsidiaryName ?? '...',
    },
    {
      id: 'vendor-name',
      key: 'Vendor',
      value: item?.vendor?.name || item?.description || `Expense: ${item?.vendorName}`,
    },
    {
      id: 'created-by',
      key: 'Created by',
      value: item?.transaction?.createdByName ?? '...',
    },
    {
      id: 'created-at',
      key: 'Created at',
      value: item?.createdAt ? `${dayjs(item?.createdAt).format('MM/DD/YYYY h:mmA')}` : '...',
    },
    {
      id: 'approver-name',
      key: 'Approver',
      value: item?.transaction?.billApproverName ?? '...',
    },
  ];

  const onClickMore = () => undefined;
  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const renderVendorName = () => {
    const vendorName = item?.vendor?.name || item?.description || `Expense: ${item?.vendorName}`;
    return <h1 className="text-base font-semibold text-Gray-3">{vendorName}</h1>;
  };

  const handleShareFeedback = () => {
    openFeedbackModal(true);
  };

  const renderMenuItems = () => {
    const items = [];
    items.push(
      <PopoverMenuItem
        key="issue-with-this-item"
        value="issue-with-this-item"
        label="Issue With This Item"
        onClick={handleShareFeedback}
      />,
    );
    return items;
  };

  return (
    <div className={classNames('flex flex-1 flex-row', className)}>
      <div className="h-full flex flex-1 flex-col bg-white shadow-xl overflow-y-scroll">
        <div className="flex flex-1 flex-col px-8 pt-8 pb-5">
          <div className="flex flex-row items-center w-full justify-between">
            <button type="button" onClick={onClickCloseSlideOver} className="flex w-4 h-4">
              <BasicsXSmall className="w-4 h-4" width={20} height={20} />
            </button>
            <button type="button" onClick={onClickMore}>
              <Menu as="div" className="relative inline-block z-10 text-left">
                <div>
                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <MoreVertical className="fill-current text-Gray-6" width={15} height={15} />
                  </Menu.Button>
                </div>
                <PopoverMenu>{renderMenuItems()}</PopoverMenu>
              </Menu>
            </button>
          </div>
          <div className="flex flex-row w-full justify-between mt-6">{renderVendorName()}</div>
          <div className="flex flex-col mt-6">
            <p className="text-sm font-semibold text-Gray-3">Description</p>
            <p className="text-sm font-regular text-Gray-6 mt-2 max-h-72 text-ellipsis">
              {item?.description}
            </p>
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-row items-center">
              <p className="text-sm font-semibold text-Gray-3">Information</p>
              {!!loading && <Loading className="ml-4" width={12} height={12} />}
            </div>
            <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
              {rows.map((row: LineInfo) => {
                if (!loading && isEmptyOrSpaces(row?.value)) return null;
                if (item?.transaction?.currency === 'USD' && row?.id === 'converted-amount') {
                  return null;
                }
                return (
                  <div
                    key={row?.key}
                    className="flex w-full py-3.5 max-h-32 flex-row items-center justify-between border-b border-b-Gray-28"
                  >
                    <p className="text-Gray-6 text-sm min-w-max">{row?.key}</p>
                    <p className="text-Gray-3 line-clamp-5 text-ellipsis overflow-hidden text-sm text-right font-semibold ml-6">
                      {row?.value}
                    </p>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="mt-auto flex flex-row justify-end">
            <p className="text-Gray-11 text-xs">{item?.transaction?.id ?? '...'}</p>
          </div>
        </div>
      </div>
      {item && (
        <FeedBackModal
          open={isOpenFeedbackModal}
          onClose={() => openFeedbackModal(false)}
          itemId={item?.id}
          type={FeedBackType.LineItem}
        />
      )}
    </div>
  );
};

export default LineItemDetails;
