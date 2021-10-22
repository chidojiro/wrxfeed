import React from 'react';
import { stringToColor } from '@common/utils';
import { classNames } from '@main/utils';

const DEFAULT_SIZE = 32;

export interface CircleAvatarProps {
  size?: number;
  className?: string;
  name?: string;
  initialLength?: number;
  onClick?: (value?: string) => void;
}

const CircleAvatar: React.VFC<CircleAvatarProps> = ({
  size,
  className,
  name,
  initialLength,
  onClick,
}) => {
  // Variables
  const initials = name?.slice(0, initialLength ?? 3) ?? '';
  const bgColor = stringToColor(name ?? '');

  return (
    <div
      aria-hidden="true"
      className={classNames('flex justify-center items-center', className ?? '')}
      style={{
        width: size ?? DEFAULT_SIZE,
        height: size ?? DEFAULT_SIZE,
        borderRadius: (size ?? DEFAULT_SIZE) / 2,
        backgroundColor: bgColor,
      }}
      onClick={() => onClick && onClick(name)}
    >
      <h5 className="text-xs font-semibold text-white">{initials}</h5>
    </div>
  );
};

export default React.memo(CircleAvatar);
