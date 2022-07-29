import { ReactComponent as AddIcon } from '@/assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@/assets/icons/solid/tick-small.svg';
import { Button } from '@/common/components';
import { Subscription } from '@/main/entity';
import React from 'react';
import { useSubscribe } from './useSubscribe';
import { useSubscription } from './useSubscription';
import { useUnsubscribe } from './useUnsubscribe';

export type ToggleFollowButtonProps<T> = {
  colorScheme?: 'white' | 'primary';
  loading?: boolean;
  item: T;
  type: keyof Subscription;
};

export const ToggleFollowButton = <T extends { id: number; name: string }>({
  colorScheme = 'primary',
  loading,
  item,
  type,
}: ToggleFollowButtonProps<T>) => {
  const baseProps = {
    pill: true,
    variant: 'outline' as any,
    colorScheme,
    loading,
  };

  const { isSubscribed, mutateSubscription, isValidatingSubscription } = useSubscription();
  const { subscribe, isSubscribing } = useSubscribe({ onSuccess: () => mutateSubscription() });
  const { unsubscribe, isUnsubscribing } = useUnsubscribe({
    onSuccess: () => mutateSubscription(),
  });

  return isSubscribed(type, item.id) ? (
    <Button
      {...baseProps}
      onClick={() => unsubscribe(type, item)}
      loading={isUnsubscribing || isValidatingSubscription}
      iconLeft={
        <TickIcon
          width={16}
          height={16}
          viewBox="0 0 15 15"
          className="stroke-current path-no-stroke"
        />
      }
    >
      Following
    </Button>
  ) : (
    <Button
      {...baseProps}
      onClick={() => subscribe(type, item)}
      loading={isSubscribing || isValidatingSubscription}
      iconLeft={
        <AddIcon
          width={16}
          height={16}
          viewBox="0 0 15 15"
          className="stroke-current stroke-1 path-no-stroke"
        />
      }
    >
      Follow
    </Button>
  );
};
