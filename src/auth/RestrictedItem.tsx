import { EyeHideIcon } from '@/assets';
import { ClassName } from '@/common/types';
import clsx from 'clsx';

export type RestrictedItemProps = ClassName & {
  //
};

export const RestrictedItem = ({ className }: RestrictedItemProps) => {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <EyeHideIcon className="text-red-1" />
      <span className="text-Gray-6 italic">Restricted</span>
    </div>
  );
};
