import React from 'react';
import UserAvatar from '@/main/atoms/UserAvatar';
import { User } from '@/main/entity';
import clsx from 'clsx';

export interface EditorAvatarProps {
  className?: string;
  updater: User;
  size?: number;
}

const EditorAvatar: React.VFC<EditorAvatarProps> = ({ className = '', updater, size = 24 }) => {
  const updaterName = updater?.fullName ?? '';

  return (
    <div className={clsx('flex w-6 h-6 group relative', className)}>
      <UserAvatar user={updater} size={size} />
      {typeof updaterName === 'string' && updaterName?.length > 0 && (
        <div className="invisible group-hover:visible absolute -top-10 left-0">
          <div className="bg-primary p-2 rounded-sm">
            <p className="text text-white text-xs truncate font-semibold">{updaterName}</p>
          </div>
          <svg
            className="absolute text-primary h-2 left-3 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default EditorAvatar;
