import React from 'react';
import { TableSortAscIcon, TableSortDescIcon, TableSortIcon } from '@/assets';
import { TableContext } from './Table';

type SortButtonProps = { sortKey: string; sortValue?: string };

export const SortButton = ({ sortKey, sortValue }: SortButtonProps) => {
  const {
    tableProps: { onSortChange },
  } = React.useContext(TableContext);

  const order = ((): 'asc' | 'desc' | 'none' => {
    if (sortValue?.startsWith('-') && sortValue.slice(1) === sortKey) return 'desc';

    if (!sortValue?.startsWith('-') && sortValue === sortKey) return 'asc';

    return 'none';
  })();

  const renderIcon = () => {
    if (order === 'asc') return <TableSortAscIcon />;

    if (order === 'desc') return <TableSortDescIcon />;

    return <TableSortIcon />;
  };

  const handleClick = () => {
    if (order === 'asc') return onSortChange?.('-' + sortKey);

    return onSortChange?.(sortKey);
  };

  return (
    <button className="text-Gray-6" onClick={handleClick}>
      {renderIcon()}
    </button>
  );
};
