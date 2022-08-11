import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import React from 'react';
import { usePagination, UsePaginationProps, UsePaginationReturn } from '../../hooks';
import { HTMLDivProps } from '../../types';
import { PaginationItems } from './PaginationItems';
import { ShowingRange } from './ShowingRange';

export type PaginationProps = UsePaginationProps & Omit<HTMLDivProps, 'onChange'>;

type PaginationProviderValue = UsePaginationReturn;

export const PaginationContext = React.createContext<PaginationProviderValue>({
  items: [],
  showingRange: { from: 0, to: 0, total: 0 },
});

export const Pagination = ({
  children,
  totalRecord,
  centerItemsCount,
  onChange,
  page,
  perPage = DEFAULT_ITEMS_PER_INFINITE_LOAD,
  sideItemsCount,
  ...restProps
}: PaginationProps) => {
  const usePaginationReturn = usePagination({
    totalRecord,
    centerItemsCount,
    onChange,
    page,
    perPage,
    sideItemsCount,
  });

  const providerValue = React.useMemo(() => usePaginationReturn, [usePaginationReturn]);

  if (totalRecord <= perPage) return null;

  if (!children)
    return (
      <PaginationContext.Provider value={providerValue}>
        <PaginationItems {...restProps} />
      </PaginationContext.Provider>
    );

  return <PaginationContext.Provider value={providerValue}>{children}</PaginationContext.Provider>;
};

Pagination.Items = PaginationItems;
Pagination.ShowingRange = ShowingRange;
