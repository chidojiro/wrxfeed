import { HTMLDivProps } from '@/common/types';
import React from 'react';
import { PaginationContext } from './Pagination';

type PaginationShowingRangeProps = HTMLDivProps;

export const ShowingRange = ({ ...restProps }: PaginationShowingRangeProps) => {
  const { showingRange } = React.useContext(PaginationContext);

  return (
    <div {...restProps}>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{showingRange.from}</span> to{' '}
        <span className="font-medium">{showingRange.to}</span> of{' '}
        <span className="font-medium">{showingRange.total}</span> results
      </p>
    </div>
  );
};
