import React, { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import mixpanel from 'mixpanel-browser';

import { slideOverOpenState } from '@/main/states/slideOver.state';
import { FeedApis } from '@/feed/apis';
import EventEmitter, { EventName } from '@/main/EventEmitter';
import { TransLineItem } from '@/main/entity';
import { classNames } from '@/common/utils';
import { useHandler } from '@/common/hooks';
import { useIdentity } from '@/identity/hooks';
import LineItemDetails from '@/feed/LineItemDetails';

export interface SelectItemProps {
  item: TransLineItem;
}

export interface SlideOverProps {
  className?: string;
}

const SlideOver = ({ className = '' }: SlideOverProps) => {
  const [open, setOpen] = useRecoilState(slideOverOpenState);
  const [item, setItem] = useState<TransLineItem>();

  const identity = useIdentity();

  const { handle, isLoading, data } = useHandler((lineItemId: number) =>
    FeedApis.getLineItemDetail({ lineItemId }),
  );

  const combinedData = { ...item, ...(data ? data : {}) } as TransLineItem;

  const handleOpenSlide = (props: SelectItemProps | unknown, feedId?: number | undefined) => {
    if (props && typeof props === 'object') {
      const lineItemProps = props as SelectItemProps;
      setItem({
        ...lineItemProps.item,
      });
      handle(lineItemProps?.item?.id);
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

  useEffect(() => {
    EventEmitter.subscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop, feedId) =>
      handleOpenSlide(prop, feedId as number),
    );
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_LINE_ITEM_DETAILS, (prop, feedId) =>
        handleOpenSlide(prop, feedId as number),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <div className={classNames('absolute inset-0 overflow-hidden', className)}>
        {/* <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
        <div role="alertdialog" className="absolute inset-0 z-5" onClick={() => setOpen(false)} />
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
              {!!combinedData && (
                <LineItemDetails
                  open={open}
                  setOpen={(isOpen: boolean) => setOpen(isOpen)}
                  loading={isLoading}
                  item={combinedData}
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
