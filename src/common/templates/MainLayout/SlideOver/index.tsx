/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useErrorHandler } from 'react-error-boundary';

import { TransLineItem } from '@main/entity';
import { isApiError } from '@error/utils';

import { useApi } from '@api';

import LineItemDetails from '@main/molecules/LineItemDetails';
import EventEmitter, { EventName } from '@main/EventEmitter';
import { classNames } from '@common/utils';

export interface SelectItemProps {
  item: TransLineItem;
}

export interface SlideOverProps {
  className?: string;
}

export type LineInfo = {
  key: string;
  value: string;
};

const SlideOver: React.VFC<SlideOverProps> = ({ className = '' }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<TransLineItem>();
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

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
    EventEmitter.subscribe(EventName.SHOW_LINE_ITEM_DETAILS, handleOpenSlide);
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_LINE_ITEM_DETAILS, handleOpenSlide);
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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={setOpen}>
        <div className={classNames('absolute inset-0 overflow-hidden', className)}>
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
              <div className="w-screen max-w-md flex flex-1 flex-col pt-navbar">
                {!!item && (
                  <LineItemDetails
                    open={open}
                    setOpen={(isOpen: boolean) => setOpen(isOpen)}
                    loading={loading}
                    item={item}
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
