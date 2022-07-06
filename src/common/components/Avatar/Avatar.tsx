import { ClassName } from '@/common/types';
import { StringUtils, withProjectClassNamePrefix } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = ClassName & {
  src?: string;
  fullName: string;
  size?: AvatarSize;
};

export const Avatar = ({ src, className, fullName, size = 'sm' }: AvatarProps) => {
  return (
    <div
      className={clsx(
        withProjectClassNamePrefix('avatar'),
        'rounded-full overflow-hidden',
        className,
        { 'w-6 h-6': size === 'sm' },
      )}
    >
      {src ? (
        <img src={src} alt="" className="object-cover" title={fullName} />
      ) : (
        <div
          className={clsx(
            'bg-purple-5 text-white font-semibold w-full h-full flex items-center justify-center',
            { 'text-3xs': size === 'sm' },
          )}
          title={fullName}
        >
          {StringUtils.getNameInitials(fullName)}
        </div>
      )}
    </div>
  );
};
