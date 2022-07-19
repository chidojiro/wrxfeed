import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const Row = ({ className, ...restProps }: Props) => {
  return (
    <tr
      {...restProps}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('table-row'),
        'group',
        'border-b border-Gray-28',
        className,
      )}
    ></tr>
  );
};
