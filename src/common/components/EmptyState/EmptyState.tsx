import clsx from 'clsx';
import { ClassName } from '@/common/types';

export type EmptyStateProps = ClassName & {
  title?: string;
  content: string;
};

export const EmptyState = ({ className, title, content }: EmptyStateProps) => {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col space-y-1 h-[200px] bg-Gray-12 rounded-card justify-center items-center',
        className,
      )}
    >
      <p className="text-sm font-bold text-primary">{title}</p>
      <p className="text-2sm text-Gray-6">{content}</p>
    </div>
  );
};
