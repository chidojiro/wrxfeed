import { TableSortAscIcon, TableSortDescIcon, TableSortIcon } from '@/assets';

type SortIconProps = { order: 'asc' | 'desc' | 'none' };

export const SortIcon = ({ order }: SortIconProps) => {
  if (order === 'asc') return <TableSortAscIcon />;

  if (order === 'desc') return <TableSortDescIcon />;

  return <TableSortIcon />;
};
