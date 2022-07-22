import React from 'react';
import { ReactComponent as AddIcon } from '@/assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@/assets/icons/solid/tick-small.svg';
import { Button } from '../Button';

export type ToggleFollowButtonProps = {
  following: boolean;
  onFollow: React.MouseEventHandler<HTMLButtonElement>;
  onUnFollow: React.MouseEventHandler<HTMLButtonElement>;
  colorScheme?: 'white' | 'primary';
  loading?: boolean;
};

export const ToggleFollowButton = ({
  following,
  onFollow,
  onUnFollow,
  colorScheme = 'primary',
  loading,
}: ToggleFollowButtonProps) => {
  const baseProps = {
    pill: true,
    variant: 'outline' as any,
    colorScheme,
    loading,
  };

  return following ? (
    <Button
      {...baseProps}
      onClick={onUnFollow}
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
      onClick={onFollow}
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
