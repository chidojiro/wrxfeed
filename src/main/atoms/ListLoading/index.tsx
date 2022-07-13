import React from 'react';
import Loading from '@/common/atoms/Loading';
import clsx from 'clsx';

export interface ListLoadingProps {
  className?: string;
}

const ListLoading = React.forwardRef(({ className = '' }: ListLoadingProps, ref: any) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'flex justify-between items-center w-[8.2rem] h-[1.875rem] pl-5 pr-4 m-auto rounded-[15px] border border-Gray-3',
        className,
      )}
    >
      <Loading width={16} height={16} />
      <p className="text-sm text-Gray-1 mb-0.5">Loading...</p>
    </div>
  );
});

ListLoading.displayName = 'ListLoading';

export default React.memo(ListLoading);
