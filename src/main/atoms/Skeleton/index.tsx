import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={clsx(className, 'animate-pulse bg-black/40')} />;
};
