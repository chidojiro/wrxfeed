import React from 'react';
import { useInfiniteLoader, UseInfiniteLoaderProps } from '@/common/hooks';
import ListLoading from '@/main/atoms/ListLoading';
import { ClassName } from '@/common/types';
import clsx from 'clsx';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { PaginationParams } from '@/rest/types';
import { StringUtils } from '@/common/utils';

export type InfiniteLoaderProps<T = unknown> = ClassName &
  Omit<UseInfiniteLoaderProps<T>, 'anchor' | 'onLoad' | 'until'> & {
    itemsPerLoad?: number;
    onLoad: (params: PaginationParams) => Promise<T>;
    until?: UseInfiniteLoaderProps<T>['until'];
  };

export const InfiniteLoader = <T,>({
  className,
  itemsPerLoad = DEFAULT_ITEMS_PER_INFINITE_LOAD,
  onLoad,
  until: untilProp,
  mode = 'ON_SIGHT',
  ...restProps
}: InfiniteLoaderProps<T>) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const until = untilProp ?? ((data: T) => (data as any).length < itemsPerLoad);

  const handleLoad = (page: number) =>
    (console.log('onLoad') as any) ||
    onLoad({
      limit: itemsPerLoad,
      offset: (page - 1) * itemsPerLoad,
    });

  const { isExhausted, loadMore } = useInfiniteLoader({
    ...restProps,
    mode,
    onLoad: handleLoad,
    until,
    anchor: ref,
  });

  if (mode === 'ON_DEMAND') {
    if (isExhausted) return null;

    return (
      <button
        className={clsx(
          StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-demand'),
          'inline-block text-xs p-2',
        )}
        type="button"
        onClick={loadMore}
      >
        Load More
      </button>
    );
  }

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

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-sight'),
        'flex items-center justify-center mt-6',
      )}
    >
      {renderContent()}
    </div>
  );
};
