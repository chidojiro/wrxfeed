import React from 'react';
import { useInfiniteLoader, UseInfiniteLoaderProps } from '@/common/hooks';
import ListLoading from '@/main/atoms/ListLoading';
import { ClassName } from '@/common/types';
import clsx from 'clsx';

type InfiniteLoaderProps<T = unknown> = ClassName &
  Omit<UseInfiniteLoaderProps<T>, 'anchor'> & {
    //
  };

export const InfiniteLoader = <T,>({ className, ...restProps }: InfiniteLoaderProps<T>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { isExhausted } = useInfiniteLoader({ ...restProps, anchor: ref });

  const renderContent = () => {
    if (isExhausted)
      return (
        <p
          className={clsx(
            'text-base text-center text-Neutral-4 mt-3 sm:mt-8 inline-block',
            className,
          )}
        >
          <span>That&apos;s all for now.</span>
          <span role="img" aria-label="rocket">
            {' '}
            🚀
          </span>
        </p>
      );

    return <ListLoading ref={ref} className={clsx('inline-block', className)} />;
  };

  return <div className="flex items-center justify-center mt-6">{renderContent()}</div>;
};
