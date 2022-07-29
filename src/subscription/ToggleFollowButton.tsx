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
  item: T | T[];
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

  const { subscription, isSubscribed } = useSubscription();
  const { subscribe, isSubscribing } = useSubscribe();
  const { unsubscribe, isUnsubscribing } = useUnsubscribe();

  const subscribed = [item].flat().some(({ id }) => isSubscribed(type, id));

  return subscribed ? (
    <Button
      {...baseProps}
      onClick={(e) => {
        e.stopPropagation();
        unsubscribe(type, item);
      }}
      loading={!!subscription && isUnsubscribing}
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
      onClick={(e) => {
        e.stopPropagation();
        subscribe(type, item);
      }}
      loading={!!subscription && isSubscribing}
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
