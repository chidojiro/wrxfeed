import { ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Tooltip } from '../Tooltip';

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
        StringUtils.withProjectClassNamePrefix('avatar'),
        'rounded-full overflow-hidden',
        className,
        { 'w-6 h-6': size === 'sm' },
      )}
    >
      <Tooltip
        arrowClassName="absolute left-1.5 -bottom-0.5"
        placement="top-start"
        trigger={
          src ? (
            <img src={src} alt="" className="object-cover" />
          ) : (
            <div
              className={clsx(
                'bg-purple-5 text-white font-semibold w-full h-full flex items-center justify-center',
                { 'text-3xs': size === 'sm' },
              )}
            >
              {StringUtils.getNameInitials(fullName)}
            </div>
          )
        }
      >
        {fullName}
      </Tooltip>
    </div>
  );
};
