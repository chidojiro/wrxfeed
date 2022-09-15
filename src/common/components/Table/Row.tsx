import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
> & {
  variant?: 'noBorder';
};

export const Row = ({ className, variant, ...restProps }: Props) => {
  return (
    <tr
      {...restProps}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('table-row'),
        'group',
        { 'border-b border-Gray-28': variant !== 'noBorder' },
        className,
      )}
    ></tr>
  );
};
