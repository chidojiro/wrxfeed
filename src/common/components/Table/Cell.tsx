import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

export const Cell = ({ className, ...restProps }: Props) => {
  return (
    <td
      {...restProps}
      className={clsx(StringUtils.withProjectClassNamePrefix('table-cell'), 'py-2 px-4', className)}
    ></td>
  );
};
