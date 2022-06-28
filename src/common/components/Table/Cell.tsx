import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

export type Props = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

export const Cell = ({ className, ...restProps }: Props) => {
  return (
    <td
      {...restProps}
      className={classNames(withProjectClassNamePrefix('table-cell'), 'py-2 px-4', className)}
    ></td>
  );
};
