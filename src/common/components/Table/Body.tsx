import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Body = ({ className, ...restProps }: Props) => {
  return (
    <tbody
      {...restProps}
      className={clsx(StringUtils.withProjectClassNamePrefix('table-body'), className)}
    ></tbody>
  );
};
