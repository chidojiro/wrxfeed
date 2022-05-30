/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { FeedBackType } from '@main/types';
import {
  decimalLogic,
  DecimalType,
  getNameAbbreviation,
  getTransactionColor,
  getVendorNameFromLineItem,
  isEmptyOrSpaces,
} from '@main/utils';
import { TransLineItem, TranStatusType } from '@main/entity';
import { classNames } from '@common/utils';

import Loading from '@common/atoms/Loading';
import FeedBackModal from '@main/organisms/FeedBackModal';

import {
  BasicsXRegular,
  DetailLogoDefault,
  BasicTickSmall,
  ChainLinkIcon,
  EmailIcon,
  PhoneIcon,
  BasicsEditCircle,
} from '@assets';

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
      id: 'category',
      key: 'Category',
      value: item?.category?.name ?? '...',
    },
    {
      id: 'original-amount',
      key: 'Original Amount',
      value: getOriginalAmountWithSign(),
    },
    {
      id: 'subsidiary-name',
      key: 'Subsidiary',
      value: item?.transaction?.subsidiaryName ?? '...',
    },
    {
      id: 'terms',
      key: 'Terms',
      value: item?.transaction?.terms ?? '...',
    },
    {
      id: 'due-date',
      key: 'Due Date',
      value: dayjs(item?.transaction?.dueDate).format('MMM D, YYYY'),
    },
  ];

  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const renderVendorName = () => {
    const vendorName = getVendorNameFromLineItem(item);
    return (
      <div className="flex-auto text-lg font-bold text-Gray-3 truncate text-ellipsis mr-2">
        {vendorName}
      </div>
    );
  };

  const renderEditVendorInfoButton = () => {
    return (
      <button
        type="button"
        className="flex flex-none ml-auto flex-row items-center px-3 py-1.5 space-x-2 rounded-sm hover:bg-Gray-12"
      >
        <BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };

  const tranType: TranStatusType | null = useMemo(
    () => getTransactionColor(item?.transaction?.status ?? ''),
    [item?.transaction?.status],
  );

  const renderTransactionType = () => {
    return (
      <div
        className="flex flex-row flex-none justify-center items-center rounded-full bg-Green-8 px-2.5 py-0.5 h-5 mr-2.5 min-h-[20px]"
        style={{ backgroundColor: tranType?.color?.bgColor }}
      >
        <div
          className="w-1.5 h-1.5 bg-Green-400 rounded-full mr-[7px]"
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

  const renderAvatarIcon = (fullName: string) => {
    const shortName = getNameAbbreviation(fullName);
    return (
      <div className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center">
        <div className="flex text-white text-xs font-semibold">{shortName}</div>
      </div>
    );
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

        <div className="flex flex-col px-8 pt-8 pb-5">
          <div className="flex flex-row w-full">
            {renderVendorName()}
            {renderEditVendorInfoButton()}
          </div>
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

          <div className="flex flex-col mt-6 rounded-lg border border-gray-500 p-3">
            <div className="flex flex-row w-full text-sm text-gray-500">
              <p className="flex-auto text-base font-bold text-Gray-3 truncate text-ellipsis mr-2">
                {item?.description}
              </p>
              {!!loading && <Loading className="ml-4" width={12} height={12} />}
              {renderTransactionType()}
              <p className="text-base text-Gray-3 font-bold text-right">
                {`${decimalLogic(item?.amountUsd, DecimalType.DetailView, '$')}`}
              </p>
            </div>

            <div className="flex flex-row w-full mt-2 mb-2">
              <div className="flex flex-row flex-initial text-xs text-Gray-6 mr-1">
                <p>Created by:</p>
                {renderAvatarIcon(item?.transaction?.createdByName ?? '')}
              </div>
              <div className="flex flex-row flex-0 text-xs text-Gray-6 mr-1">
                <p>Approver:</p>
                {renderAvatarIcon(item?.transaction?.billApproverName ?? '')}
              </div>
              <div className="flex flex-row flex-0 text-xs text-Gray-6">
                <p>
                  Transaction Date:&nbsp;
                  {dayjs(item?.transDate).format('MMM D, YYYY')}
                </p>
              </div>
            </div>

            <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
              {rows.map((row: LineInfo) => {
                if (!loading && isEmptyOrSpaces(row?.value)) return null;

                return (
                  <div
                    key={row?.key}
                    className="flex w-full py-3.5 max-h-32 flex-row items-center justify-between border-b border-b-Gray-28"
                  >
                    <p className="text-Gray-6 text-sm min-w-max">{row?.key}</p>
                    <p className="text-Gray-3 line-clamp-5 text-ellipsis overflow-hidden text-sm text-right ml-6">
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
