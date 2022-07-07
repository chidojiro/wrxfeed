import { withMountOnOpen } from '@/common/hocs';
import { useFetcher } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { FeedApis } from '@/feed/apis';
import LineItemDetails from '@/feed/LineItemDetails';
import { useIdentity } from '@/identity/hooks';
import { AppLayout } from '@/layout/AppLayout';
import { TransLineItem } from '@/main/entity';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import React, { Fragment } from 'react';

export interface SelectItemProps {
  item: TransLineItem;
}

export type LineItemDrawerProps = OpenClose & {
  className?: string;
  lineItem: TransLineItem;
  feedId: number;
};

export const LineItemDrawer = withMountOnOpen(
  ({ className, onClose, open, feedId, lineItem }: LineItemDrawerProps) => {
    const identity = useIdentity();

    const { isValidating, data: lineItemDetails } = useFetcher(['lineItem', lineItem.id], () =>
      FeedApis.getLineItemDetails({ lineItemId: lineItem.id }),
    );

    React.useEffect(() => {
      mixpanel.track('Feed Detail View', {
        user_id: identity?.id,
        email: identity?.email,
        company: identity?.company?.id,
        feed_id: feedId,
        line_item_id: lineItem.id,
      });
    }, [feedId, identity?.company?.id, identity?.email, identity?.id, lineItem.id]);

    return (
      <AppLayout.Drawer open={open}>
        <Transition.Root show={open} as={Fragment}>
          <div className={clsx('absolute inset-0 overflow-hidden', className)}>
            <div role="alertdialog" className="absolute inset-0 z-5" onClick={onClose} />
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
                  <LineItemDetails
                    onCloseClick={onClose}
                    loading={isValidating}
                    item={lineItemDetails}
                  />
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition.Root>
      </AppLayout.Drawer>
    );
  },
);
