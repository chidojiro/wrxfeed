import { ClassName } from '@/common/types';
import clsx from 'clsx';

type DividerProps = ClassName & {
  direction?: 'horizontal' | 'vertical';
};

export const Divider = ({ direction = 'horizontal', className }: DividerProps) => {
  return (
    <div
      className={clsx(
        'border-Gray-11 w-full',
        { 'border-b': direction === 'horizontal', 'border-l': direction === 'vertical' },
        className,
      )}
    ></div>
  );
};
