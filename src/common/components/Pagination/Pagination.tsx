import { HTMLDivProps } from '../../types';
import { usePagination, UsePaginationProps, UsePaginationReturn } from '../../hooks';
import React, { useEffect } from 'react';
import { PaginationItems } from './PaginationItems';
import { ShowingRange } from './ShowingRange';

export type PaginationProps = UsePaginationProps & HTMLDivProps;

type PaginationProviderValue = UsePaginationReturn;

export const PaginationContext = React.createContext<PaginationProviderValue>({
  items: [],
  showingRange: { from: 0, to: 0, total: 0 },
});

// eslint-disable-next-line no-empty-pattern
export const Pagination = ({
  children,
  totalRecord,
  centerItemsCount,
  onChange,
  onSetPage,
  page,
  perPage,
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

  const from = providerValue.showingRange.from;
  const to = providerValue.showingRange.to;

  useEffect(() => {
    if (onSetPage) {
      onSetPage(from, to);
    }
  }, [from, to, onSetPage]);

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
