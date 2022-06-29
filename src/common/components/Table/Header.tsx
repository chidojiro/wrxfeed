import classNames from 'classnames';
import React from 'react';
import { withProjectClassNamePrefix } from '../../utils';
import { SortButton } from './SortButton';
import { TableContext } from './Table';

export type Props = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
  HTMLTableHeaderCellElement
> & {
  sortKey?: string;
};

export const Header = ({ className, sortKey, children, ...restProps }: Props) => {
  const {
    tableProps: { sort },
  } = React.useContext(TableContext);

  return (
    <th
      {...restProps}
      className={classNames(
        withProjectClassNamePrefix('table-header'),
        'py-3 px-4',
        'font-semibold text-xs text-Gray-3 text-left',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {children}
        {!!sortKey && <SortButton sortKey={sortKey} sortValue={sort} />}
      </div>
    </th>
  );
};
