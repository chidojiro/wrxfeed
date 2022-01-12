/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilState } from 'recoil';
// types
import { TransLineItem } from '@main/entity';
import { isApiError } from '@error/utils';
import { classNames } from '@common/utils';
// hooks and states
import { useApi } from '@api';
import { slideOverOpenState } from '@main/states/slideOver.state';
// components
import LineItemDetails from '@main/molecules/LineItemDetails';
import EventEmitter, { EventName } from '@main/EventEmitter';

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
  const [open, setOpen] = useRecoilState(slideOverOpenState);
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<TransLineItem>();

  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const handleOpenSlide = (
    props: SelectItemProps | unknown,
    curItem: TransLineItem | undefined,
  ) => {
    if (props && typeof props === 'object') {
      const lineItemProps = props as SelectItemProps;
      setItem({
        ...curItem,
        ...lineItemProps.item,
      });
      if (!open) {
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop) => handleOpenSlide(prop, item));
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop) =>
        handleOpenSlide(prop, item),
      );
    };
  }, [item]);

  const getLineItemDetails = async (id: number) => {
    try {
      setLoading(true);
      const res = await ApiClient.getLineItemById(id);
      setItem(res);
    } catch (error: unknown) {
      toast.error(JSON.stringify(error));
      if (isApiError(error)) {
        errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClickOverlay = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (item?.id && !loading) {
      getLineItemDetails(item?.id);
    }
  }, [item, open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <div className={classNames('absolute inset-0 overflow-hidden', className)}>
        {/* <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
        <div role="alertdialog" className="absolute inset-0 z-5" onClick={onClickOverlay} />
        <div className="fixed inset-y-0 z-20 right-0 max-w-md flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-200 sm:duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200 sm:duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen max-w-md flex flex-1 flex-col pt-navbar relative">
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
    </Transition.Root>
  );
};

export default SlideOver;
