/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import dayjs from 'dayjs';

import { FeedBackType } from '@main/types';
import { decimalLogic, DecimalType, getVendorNameFromLineItem, isEmptyOrSpaces } from '@main/utils';
import { TransLineItem } from '@main/entity';
import { classNames } from '@common/utils';

import Loading from '@common/atoms/Loading';
import FeedBackModal from '@main/organisms/FeedBackModal';

import { ReactComponent as BasicsXRegular } from '@assets/icons/outline/basics-x.svg';
import { ReactComponent as DetailLogoDefault } from '@assets/icons/solid/details-logo-default.svg';
import { ReactComponent as BasicTickSmall } from '@assets/icons/solid/basics-tick-small.svg';
import { ReactComponent as ChainLinkIcon } from '@assets/icons/outline/chain-link.svg';
import { ReactComponent as EmailIcon } from '@assets/icons/outline/email.svg';
import { ReactComponent as PhoneIcon } from '@assets/icons/outline/phone.svg';

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
      value: `${decimalLogic(item?.amountUsd, DecimalType.DetailView, '$')}`,
    },
    {
      id: 'modified-at',
      key: 'Modified at',
      value: item?.updatedAt && `${dayjs(item?.updatedAt).format('MM/D/YYYY h:mmA')} PST`,
    },
    {
      id: 'subsidiary-name',
      key: 'Subsidiary',
      value: item?.transaction?.subsidiaryName ?? '...',
    },
    {
      id: 'vendor-name',
      key: 'Vendor',
      value: getVendorNameFromLineItem(item),
    },
    {
      id: 'created-by',
      key: 'Created by',
      value: item?.transaction?.createdByName ?? '...',
    },
    // {
    //   id: 'created-at',
    //   key: 'Created at',
    //   value: item?.createdAt ? `${dayjs(item?.createdAt).format('MM/DD/YYYY h:mmA')}` : '...',
    // },
    {
      id: 'approver-name',
      key: 'Approver',
      value: item?.transaction?.billApproverName ?? '...',
    },
    {
      id: 'transaction-status',
      key: 'Status',
      value: item?.transaction?.status ?? '',
    },
  ];

  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const renderVendorName = () => {
    const vendorName = getVendorNameFromLineItem(item);
    return <h1 className="text-base font-semibold text-Gray-3">{vendorName}</h1>;
  };

  return (
    <div className={classNames('flex flex-1 flex-row', className)}>
      <div className="h-full flex flex-1 flex-col bg-white shadow-xl overflow-y-scroll">
        <div
          className="w-full h-28 flex p-8"
          style={{
            background:
              'linear-gradient(124.66deg, #E081E2 7.8%, #A26ECC 27.02%, #835EBF 83.43%, #8945AF 95.9%)',
          }}
        >
          <div className="flex-1 w-24 h-24">
            <DetailLogoDefault className="w-24 h-24" />
          </div>
          <div className="flex rounded-full border border-white py-3 px-6 text-white text-sm">
            <BasicTickSmall
              className="mr-2.5 w-4 h-4 stroke-current text-white"
              width={20}
              height={20}
            />
            <span>Following</span>
          </div>
          <button type="button" onClick={onClickCloseSlideOver} className="flex-1 w-4 h-4">
            <BasicsXRegular
              className="w-4 h-4 float-right stroke-current text-white"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-8 pt-8 pb-5">
          <div className="flex-row w-full justify-between font-bold">{renderVendorName()}</div>
          <div className="flex flex-row w-full mt-2 mb-2">
            <div className="flex mr-4 text-xs">
              <ChainLinkIcon
                className="mr-1 stroke-current text-gray-500 align-middle"
                width={20}
                height={20}
              />
              <span>{item?.vendor?.website}</span>
            </div>
            <div className="flex mr-4 text-xs">
              <EmailIcon className="mr-1 stroke-current text-gray-500" width={20} height={20} />
              <span>{item?.vendor?.contactEmail}</span>
            </div>
            <div className="flex text-xs">
              <PhoneIcon className="stroke-current text-gray-500" width={20} height={20} />
              <span>{item?.vendor?.contactNumber}</span>
            </div>
          </div>
          <div className="flex-row w-full text-sm text-gray-500 rounded-lg border border-gray-500 p-3">
            Add a vendor description
          </div>
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
