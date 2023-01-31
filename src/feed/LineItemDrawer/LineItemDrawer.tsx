import { Drawer } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useFetcher, useHandler } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { useProfile } from '@/profile/useProfile';
import { TransLineItem } from '@/main/entity';
import { VendorApis } from '@/vendor/apis';
import { UpdateVendorPayload } from '@/vendor/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { FeedApis } from '../apis';
import { LineItemDetails } from './LineItemDetails';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';

export interface SelectItemProps {
  item: TransLineItem;
}

export type LineItemDrawerProps = OpenClose & {
  className?: string;
  lineItem: TransLineItem;
  feedId?: number;
};

export const LineItemDrawer = withMountOnOpen()(
  ({ className, onClose, feedId, lineItem, open }: LineItemDrawerProps) => {
    const { profile } = useProfile();

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
        const filteredPayLoad: UpdateVendorPayload = {
          website: payload.website ?? null,
          contactEmail: payload.contactEmail ?? null,
          contactNumber: payload.contactNumber ?? null,
          description: payload.description ?? null,
        };
        const res = await VendorApis.update(id, filteredPayLoad);
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
        user_id: profile?.id,
        email: profile?.email,
        company_id: profile?.company?.id,
        feed_id: feedId,
        line_item_id: lineItem?.id,
      });
      useMixPanelUserProfile(profile);
    }, [feedId, profile?.company?.id, profile?.email, profile?.id, lineItem?.id, profile]);

    return (
      <Drawer
        open={open}
        onClose={onClose}
        closeOnClickOutside={closeOnClickOutsideDisclosure.isOpen}
        showCloseButton={false}
      >
        <div className={clsx('relative z-20 flex flex-1 flex-col h-full', className)}>
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
