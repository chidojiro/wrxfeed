import { UserIcon } from '@/assets';
import { ClassName } from '@/common/types';
import { withProjectClassNamePrefix } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type AvatarProps = ClassName & {
  src?: string;
};

export const Avatar = ({ src, className }: AvatarProps) => {
  return (
    <div
      className={clsx(
        withProjectClassNamePrefix('avatar', 'min-w-6 min-h-6 rounded-full overflow-hidden'),
        className,
      )}
    >
      {src ? (
        <img src={src} alt="" className="object-cover" />
      ) : (
        <div className="bg-Gray-12 text-Gray-3 w-full h-full flex items-center justify-center">
          <UserIcon width={12} height={12} />
        </div>
      )}
    </div>
  );
};
