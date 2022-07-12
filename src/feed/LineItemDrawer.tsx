import { Drawer } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useFetcher } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { useIdentity } from '@/identity/hooks';
import { TransLineItem } from '@/main/entity';
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
    const identity = useIdentity();

    const { isValidating, data: lineItemDetails } = useFetcher(
      !!lineItem?.id && ['lineItem', lineItem?.id],
      () => FeedApis.getLineItemDetails({ lineItemId: lineItem?.id }),
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
      <Drawer open={open} onClose={onClose}>
        <div className={clsx('relative flex flex-1 flex-col pt-navbar h-full', className)}>
          <LineItemDetails onCloseClick={onClose} loading={isValidating} item={lineItemDetails} />
        </div>
      </Drawer>
    );
  },
);
