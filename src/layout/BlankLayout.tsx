import clsx from 'clsx';
import { Children, ClassName } from '@/common/types';

type BlankLayoutProps = Children & ClassName;

export const BlankLayout = ({ children, className }: BlankLayoutProps) => {
  return (
    <div className={clsx('fixed inset-0 rounded-md bg-white overflow-scroll', className)}>
      {children}
    </div>
  );
};
