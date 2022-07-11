import React from 'react';
import classNames from 'classnames';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

export const Cell = ({ className, ...restProps }: Props) => {
  return (
    <td
      {...restProps}
      className={classNames(
        StringUtils.withProjectClassNamePrefix('table-cell'),
        'py-2 px-4',
        className,
      )}
    ></td>
  );
};
