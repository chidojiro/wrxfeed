import { Drawer } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useFetcher, useHandler } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { useIdentity } from '@/identity/hooks';
import { TransLineItem } from '@/main/entity';
import { VendorApis } from '@/vendor/apis';
import { UpdateVendorPayload } from '@/vendor/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { FeedApis } from '../apis';
import { LineItemDetails } from './LineItemDetails';

export interface SelectItemProps {
  item: TransLineItem;
}

export type LineItemDrawerProps = OpenClose & {
  className?: string;
  lineItem: TransLineItem;
  feedId?: number;
};

export const LineItemDrawer = withMountOnOpen(
  ({ className, onClose, feedId, lineItem, open }: LineItemDrawerProps) => {
    const identity = useIdentity();

    const {
      isValidating,
      data: lineItemDetails,
      mutate,
    } = useFetcher(!!lineItem?.id && ['lineItem', lineItem.id], () =>
      FeedApis.getLineItem(lineItem.id),
    );

    const closeOnClickOutsideDisclosure = useDisclosure({ defaultIsOpen: true });

    const { handle: handleVendorUpdate } = useHandler(
      async (id: number, payload: UpdateVendorPayload) => {
        const res = await VendorApis.update(id, payload);
        mutate();
        return res;
      },
    );

    const { handle: handleLineItemUpdate } = useHandler(
      async (id: number, payload: Partial<TransLineItem>) => {
        const res = await FeedApis.updateLineItem(id, payload);
        mutate();
        return res;
      },
    );

    React.useEffect(() => {
      mixpanel.track('Feed Detail View', {
        user_id: identity?.id,
        email: identity?.email,
        company: identity?.company?.id,
        feed_id: feedId,
        line_item_id: lineItem?.id,
      });
    }, [feedId, identity?.company?.id, identity?.email, identity?.id, lineItem?.id]);

    return (
      <Drawer
        open={open}
        onClose={onClose}
        closeOnClickOutside={closeOnClickOutsideDisclosure.isOpen}
      >
        <div className={clsx('relative z-20 flex flex-1 flex-col pt-navbar h-full', className)}>
          <LineItemDetails
            onCloseClick={onClose}
            loading={isValidating}
            item={lineItemDetails}
            onModalOpen={closeOnClickOutsideDisclosure.onClose}
            onModalClose={closeOnClickOutsideDisclosure.onOpen}
            onVendorUpdate={handleVendorUpdate}
            onLineItemUpdate={handleLineItemUpdate}
          />
        </div>
      </Drawer>
    );
  },
);
