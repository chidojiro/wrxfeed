import React from 'react';
import clsx from 'clsx';
import { EyeHideIcon } from '@/assets';

export interface RestrictedWarningProps {
  className?: string;
  isShow?: boolean;
}

const RestrictedWarning: React.FC<RestrictedWarningProps> = ({
  className = '',
  isShow = false,
}) => {
  if (!isShow) {
    return null;
  }
  return (
    <div className={clsx('flex flex-col py-1', className)}>
      <div className="flex mx-10 h-8 flex-row items-center justify-center bg-purple-12 space-x-1">
        <EyeHideIcon className="text-system-alert fill-current path-no-filled" />
        <p className="text-xs text-Gray-6">Some transactions may be restricted from viewing</p>
      </div>
    </div>
  );
};

export default RestrictedWarning;
