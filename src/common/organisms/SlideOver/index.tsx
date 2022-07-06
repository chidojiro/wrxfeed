/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilState } from 'recoil';
import mixpanel from 'mixpanel-browser';

import { TransLineItem } from '@/main/entity';
import { isApiError } from '@/error/utils';
import { classNames } from '@/common/utils';
import { useIdentity } from '@/identity/hooks';
import { useApi } from '@/api';
import { slideOverOpenState } from '@/main/states/slideOver.state';

import LineItemDetails from '@/main/molecules/LineItemDetails';
import EventEmitter, { EventName } from '@/main/EventEmitter';

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

const SlideOver: React.FC<SlideOverProps> = ({ className = '' }) => {
  const [open, setOpen] = useRecoilState(slideOverOpenState);
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<TransLineItem>();

  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const identity = useIdentity();

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

  const handleOpenSlide = (props: SelectItemProps | unknown, feedId?: number | undefined) => {
    if (props && typeof props === 'object') {
      const lineItemProps = props as SelectItemProps;
      setItem({
        ...lineItemProps.item,
      });
      getLineItemDetails(lineItemProps.item?.id);
      if (!open) {
        setOpen(true);
      }

      mixpanel.track('Feed Detail View', {
        user_id: identity?.id,
        email: identity?.email,
        company: identity?.company?.id,
        feed_id: feedId,
        line_item_id: lineItemProps.item.id,
      });
    }
  };

  const onClickOverlay = () => {
    setOpen(false);
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop, feedId) =>
      handleOpenSlide(prop, feedId as number),
    );
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop, feedId) =>
        handleOpenSlide(prop, feedId as number),
      );
    };
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <div className={classNames('absolute inset-0 overflow-hidden', className)}>
        {/* <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
        <div role="alertdialog" className="absolute inset-0 z-5" onClick={onClickOverlay} />
        <div className="fixed inset-y-0 z-20 right-0 w-[588px] flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-200 sm:duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200 sm:duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen flex flex-1 flex-col pt-navbar relative">
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
