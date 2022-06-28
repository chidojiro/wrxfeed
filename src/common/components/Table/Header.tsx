import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

export type Props = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
  HTMLTableHeaderCellElement
>;

export const Header = ({ className, ...restProps }: Props) => {
  return (
    <th
      {...restProps}
      className={classNames(
        withProjectClassNamePrefix('table-header'),
        'py-3 px-4',
        'font-semibold text-xs text-Gray-3 text-left',
        className,
      )}
    ></th>
  );
};
