import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const Row = ({ className, ...restProps }: Props) => {
  return (
    <tr
      {...restProps}
      className={classNames(
        withProjectClassNamePrefix('table-row'),
        'group',
        'border-b border-Gray-28',
        className,
      )}
    ></tr>
  );
};
