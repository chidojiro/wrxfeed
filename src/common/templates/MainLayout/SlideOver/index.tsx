/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useErrorHandler } from 'react-error-boundary';

import { TransLineItem } from '@main/entity';
import { isApiError } from '@error/utils';
import EventEmitter, { EventName } from '@main/EventEmitter';

import { useApi } from '@api';

import { ReactComponent as MoreVertical } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';
import Loading from '@common/atoms/Loading';

export interface SelectItemProps {
  item: TransLineItem;
}
export interface SlideOverProps {
  className: string;
}

export type LineInfo = {
  key: string;
  value: string;
};

const SlideOver: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<TransLineItem>();
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const rows: LineInfo[] = [
    {
      key: 'Date',
      value: dayjs(item?.startDate).format('MMM D, YYYY'),
    },
    {
      key: 'Original Amount',
      value: `${item?.transaction?.currency ?? '...'} ${item?.amountFx}`,
    },
    {
      key: 'Converted Amount',
      value: `$ ${(item?.amountFx ?? 0) * (item?.rateUsd ?? 1)}`,
    },
    {
      key: 'Last Modified',
      value: dayjs(item?.endDate).format('MM/D/YYYY h:mmA'), // '10/2/2021 at 3:52PM PST',
    },
    {
      key: 'Subsidiary',
      value: item?.transaction?.subsidiaryName ?? '...',
    },
    {
      key: 'Vendor',
      value: item?.vendor?.name || item?.description || `Expense: ${item?.vendorName}`,
    },
    {
      key: 'Created by',
      value: item?.transaction?.createdByName ?? '...',
    },
    {
      key: 'Approver',
      value: item?.transaction?.billApproverName ?? '...',
    },
  ];

  const handleOpenSlide = (props: SelectItemProps | unknown) => {
    if (props && typeof props === 'object') {
      const lineItemProps = props as SelectItemProps;
      setItem(lineItemProps.item);
      if (!open) {
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.SHOW_SLIDE_OVER, handleOpenSlide);
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_SLIDE_OVER, handleOpenSlide);
    };
  }, []);

  const getLineItemDetails = async (id: number) => {
    try {
      setLoading(true);
      const res = await ApiClient.getLineItemById(id);
      setItem(res);
    } catch (error: unknown) {
      toast.error('Can not get details of this item 🤦!');
      if (isApiError(error)) {
        errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item?.id && open) {
      getLineItemDetails(item?.id);
    }
  }, [item?.id, open]);

  const onClickMore = () => undefined;
  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const renderVendorName = () => {
    const vendorName = item?.vendor?.name || item?.description || `Expense: ${item?.vendorName}`;
    return <h1 className="text-base font-semibold text-Gray-3">{vendorName}</h1>;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-y-0 right-0 max-w-md flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md flex flex-col pt-navbar">
                <div className="flex flex-1 flex-row">
                  <button
                    type="button"
                    onClick={onClickCloseSlideOver}
                    className="flex w-5 h-5 mt-4 mr-5"
                  >
                    <BasicsXSmall className="w-5 h-5" width={20} height={20} />
                  </button>
                  <div className="h-full flex flex-1 flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex flex-1 flex-col px-8 pt-8 pb-5">
                      <div className="flex flex-row w-full justify-between">
                        {renderVendorName()}
                        <button type="button" onClick={onClickMore}>
                          <MoreVertical
                            className="fill-current text-Gray-6"
                            width={15}
                            height={15}
                          />
                        </button>
                      </div>
                      <div className="flex flex-col mt-6">
                        <p className="text-sm font-semibold text-Gray-3">Description</p>
                        <p className="text-sm font-regular text-Gray-6 mt-2">{item?.description}</p>
                      </div>
                      <div className="flex flex-col mt-6">
                        <div className="flex flex-row items-center">
                          <p className="text-sm font-semibold text-Gray-3">Information</p>
                          {!!loading && <Loading className="ml-4" width={12} height={12} />}
                        </div>
                        <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
                          {rows.map((row: LineInfo) => {
                            return (
                              <div
                                key={row.key}
                                className="flex w-full h-11 flex-row items-center justify-between border-b border-b-Gray-28"
                              >
                                <p className="text-Gray-6 text-sm">{row.key}</p>
                                <p className="text-Gray-3 text-sm font-semibold">{row.value}</p>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="mt-auto flex flex-row justify-end">
                        <p className="text-Gray-11 text-xs">{item?.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
