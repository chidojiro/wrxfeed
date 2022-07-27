import { Drawer } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useFetcher } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { useProfile } from '@/profile/useProfile';
import { TransLineItem } from '@/main/entity';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { FeedApis } from './apis';
import LineItemDetails from './LineItemDetails';

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
    const { data: profile } = useProfile();

    const { isValidating, data: lineItemDetails } = useFetcher(
      !!lineItem?.id && ['lineItem', lineItem.id],
      () => FeedApis.getLineItem(lineItem.id),
    );

    const closeOnClickOutsideDisclosure = useDisclosure({ defaultIsOpen: true });

    React.useEffect(() => {
      mixpanel.track('Feed Detail View', {
        user_id: profile?.id,
        email: profile?.email,
        company: profile?.company?.id,
        feed_id: feedId,
        line_item_id: lineItem?.id,
      });
    }, [feedId, profile?.company?.id, profile?.email, profile?.id, lineItem?.id]);

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
          />
        </div>
      </Drawer>
    );
  },
);
