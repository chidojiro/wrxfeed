import React from 'react';
import classNames from 'classnames';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Head = ({ className, ...restProps }: Props) => {
  return (
    <thead
      {...restProps}
      className={classNames(StringUtils.withProjectClassNamePrefix('table-head'), className)}
    ></thead>
  );
};
