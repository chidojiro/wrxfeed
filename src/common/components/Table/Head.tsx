import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Head = ({ className, ...restProps }: Props) => {
  return (
    <thead
      {...restProps}
      className={clsx(StringUtils.withProjectClassNamePrefix('table-head'), className)}
    ></thead>
  );
};
