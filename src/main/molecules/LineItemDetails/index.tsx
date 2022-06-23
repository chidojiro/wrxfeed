/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import {
  decimalLogic,
  DecimalType,
  getNameAbbreviation,
  getTransactionStatus,
  getVendorNameFromLineItem,
  isEmptyOrSpaces,
} from '@/main/utils';
import { TransLineItem, TranStatusType } from '@/main/entity';
import { classNames } from '@/common/utils';

import Loading from '@/common/atoms/Loading';

import {
  BasicsXRegular,
  DetailLogoDefault,
  BasicTickSmall,
  ChainLinkIcon,
  EmailIcon,
  PhoneIcon,
  BasicsEditCircle,
  StackItemsIcon,
} from '@/assets';
import Tooltip from '@/common/atoms/Tooltip';
import UpdateVendorInfoModal from '@/main/organisms/UpdateVendorInfoModal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { vendorUpdateState } from '@/main/states/vendorUpdate.state';
import { lineItemUpdateState } from '@/main/states/lineItemUpdate.state';
import UpdateDetailsLineItemInfoModal from '@/main/organisms/UpdateDetailsLineItemInfoModal';

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

type LineInfo = {
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
  const [showEditVendorDescription, setShowEditVendorDescription] = useState<boolean>(false);
  const vendorUpdate = useRecoilValue(vendorUpdateState);
  const setVendorUpdate = useSetRecoilState(vendorUpdateState);

  const [showEditLineItem, setShowEditLineItem] = useState<boolean>(false);
  const lineItemUpdate = useRecoilValue(lineItemUpdateState);
  const setLineItemUpdate = useSetRecoilState(lineItemUpdateState);

  useEffect(() => {
    setVendorUpdate({
      vendorId: item?.vendor?.id,
      vendorName: item?.vendor?.name,
      description: item?.vendor?.description,
      website: item?.vendor?.website,
      contactEmail: item?.vendor?.contactEmail,
      contactNumber: item?.vendor?.contactNumber,
    });

    setLineItemUpdate({
      id: item?.id,
      description: item?.description,
    });
  }, [item]);

  const hideEditVendorDescriptionModal = () => {
    setShowEditVendorDescription(false);
  };

  const showEditVendorDescriptionModal = () => {
    setShowEditVendorDescription(true);
  };

  const hideEditLineItemModal = () => {
    setShowEditLineItem(false);
  };

  const showEditLineItemModal = () => {
    setShowEditLineItem(true);
  };

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
      value: item?.transaction?.dueDate
        ? dayjs(item?.transaction?.dueDate).format('MMM D, YYYY')
        : '',
    },
  ];

  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const renderVendorName = () => {
    const vendorName = getVendorNameFromLineItem(item);
    return <div className="flex-auto text-lg font-bold text-Gray-3 mr-2">{vendorName}</div>;
  };

  const renderEditVendorInfoButton = () => {
    return (
      <button
        type="button"
        className="flex flex-none ml-auto flex-row items-center px-3 py-1.5 space-x-2 rounded-sm hover:bg-Gray-12"
        onClick={showEditVendorDescriptionModal}
      >
        <BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };

  const renderEditLineItemDescriptionButton = () => {
    return (
      <button
        type="button"
        className="flex flex-none ml-auto flex-row items-center px-3 py-1.5 space-x-2 rounded-sm hover:bg-Gray-12"
        onClick={showEditLineItemModal}
      >
        <BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };

  const tranType: TranStatusType | null = useMemo(
    () => getTransactionStatus(item?.transaction?.status ?? ''),
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
      <Tooltip message={fullName}>
        <div className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center">
          <div className="flex text-white text-xs font-semibold">{shortName}</div>
        </div>
      </Tooltip>
    );
  };

  const lineItems = item?.transaction?.lineItems || [];

  return (
    <div className={classNames('flex flex-1 flex-row', className)}>
      <div className="h-full flex flex-1 flex-col bg-white shadow-xl">
        <div
          className="w-full h-28 flex p-8"
          style={{
            background:
              'linear-gradient(124.66deg, #E081E2 7.8%, #A26ECC 27.02%, #835EBF 83.43%, #8945AF 95.9%)',
          }}
        >
          <div className="w-24 h-24 mr-4">
            <DetailLogoDefault className="w-24 h-24" />
          </div>
          <div className="flex rounded-full border border-white text-white text-sm h-9 p-2">
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

        <div className="flex flex-col my-5 px-8 overflow-y-auto max-h-[calc(100vh-168px)]">
          <div className="flex flex-row group w-[524px]">
            {renderVendorName()}
            <div className="block hidden group-hover:block">{renderEditVendorInfoButton()}</div>
          </div>
          <div className="flex flex-row w-[524px] mt-2 mb-2">
            <div className="flex mr-4 text-xs">
              <ChainLinkIcon
                className="mr-1 stroke-current text-gray-500 align-middle"
                width={20}
                height={20}
              />
              <span>{vendorUpdate.website}</span>
            </div>
            <div className="flex mr-4 text-xs">
              <EmailIcon className="mr-1 stroke-current text-gray-500" width={20} height={20} />
              <span>{vendorUpdate.contactEmail}</span>
            </div>
            <div className="flex text-xs">
              <PhoneIcon className="stroke-current text-gray-500" width={20} height={20} />
              <span>{vendorUpdate.contactNumber}</span>
            </div>
          </div>
          <div
            className="flex-row w-[524px] text-sm text-gray-500 rounded-lg border border-gray-200 p-3"
            onClick={showEditVendorDescriptionModal}
          >
            {vendorUpdate.description ?? 'Add a vendor description'}
          </div>

          <div className="flex flex-col mt-6 rounded-lg border border-gray-200 p-3 bg-gray-50 w-[524px]">
            <div className="flex flex-row w-full text-sm text-gray-500 group mb-2">
              <p className="flex-auto text-base font-bold text-Gray-3 mr-2">
                {lineItemUpdate.description}
              </p>
              {!!loading && <Loading className="ml-4" width={12} height={12} />}
              <div className="block hidden group-hover:block">
                {renderEditLineItemDescriptionButton()}
              </div>
              <div className="flex group-hover:hidden">
                {renderTransactionType()}
                <p className="text-base text-Gray-3 font-bold text-right">
                  {`${decimalLogic(item?.amountUsd, DecimalType.DetailView, '$')}`}
                </p>
              </div>
            </div>

            <div className="flex flex-row w-full mt-2 mb-2">
              <div className="flex flex-row flex-initial text-xs text-Gray-6 mr-1">
                <div className="flex items-center mr-0.5">Created by:</div>
                {renderAvatarIcon(item?.transaction?.createdByName ?? '')}
              </div>
              <div className="flex flex-row flex-0 text-xs text-Gray-6 mr-1">
                <div className="flex items-center mr-0.5">Approver:</div>
                {renderAvatarIcon(item?.transaction?.billApproverName ?? '')}
              </div>
              <div className="flex flex-row flex-1 text-xs text-Gray-6 justify-end">
                <div className="flex items-center">
                  Transaction Date:&nbsp;
                  {dayjs(item?.transDate).format('MMM D, YYYY')}
                </div>
              </div>
            </div>

            <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
              {rows.map((row: LineInfo) => {
                if (!loading && isEmptyOrSpaces(row?.value)) return null;

                return (
                  <div
                    key={row?.key}
                    className="flex w-full py-3.5 max-h-32 flex-row items-center justify-between border-b border-b-Gray-28 last:border-b-0"
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

          <div className="flex flex-col p-3 w-[524px]">
            <p className="text-sm font-bold text-Gray-3">Line Items from this transaction</p>
            {!!loading && <Loading className="ml-4" width={12} height={12} />}
            <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
              {lineItems.map((row: TransLineItem) => {
                return (
                  <div
                    key={row?.id}
                    className="flex w-full py-3.5 max-h-32 flex-col items-center justify-between border-b border-b-Gray-28 last:border-b-0"
                  >
                    <div className="flex w-full mb-2">
                      <StackItemsIcon
                        className="flex-initial w-4 h-4 mr-2"
                        width={20}
                        height={20}
                      />
                      <p className="text-Gray-6 text-xs min-w-max">{row?.category?.name}</p>
                    </div>
                    <div className="flex w-[524px] px-3">
                      <p className="flex-auto text-Gray-6 text-sm truncate">{row?.description}</p>
                      <p className="float-right text-Gray-3 text-sm">
                        {`${decimalLogic(row?.amountUsd, DecimalType.DetailView, '$')}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col px-3 w-[524px]">
            <p className="text-sm font-bold text-Gray-3">
              {`${getVendorNameFromLineItem(item)} also appears in these categories`}
            </p>
            {!!loading && <Loading className="ml-4" width={12} height={12} />}
            <div className="flex flex-wrap">
              {item?.vendor?.categories?.map((category) => {
                return (
                  <span
                    className="text-xs bg-purple-600 rounded px-2 mx-2 my-1 text-white"
                    key={category.id}
                  >
                    {category.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <UpdateVendorInfoModal
        open={showEditVendorDescription}
        onClose={() => hideEditVendorDescriptionModal()}
        onCancel={() => hideEditVendorDescriptionModal()}
        itemEditing={vendorUpdate}
      />
      <UpdateDetailsLineItemInfoModal
        open={showEditLineItem}
        onClose={() => hideEditLineItemModal()}
        onCancel={() => hideEditLineItemModal()}
        itemEditing={lineItemUpdate}
        transLineItem={item}
      />
    </div>
  );
};

export default LineItemDetails;
