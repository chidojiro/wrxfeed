import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';

export type SidebarNavGroupProps = ClassName & Children;

export const SidebarNavGroup = ({ className, children }: SidebarNavGroupProps) => {
  return (
    <div
      className={clsx(
        'py-2 pl-12 w-full',
        'text-xs font-semibold text-Gray-6 tracking-wider',
        className,
      )}
    >
      {children}
    </div>
  );
};
