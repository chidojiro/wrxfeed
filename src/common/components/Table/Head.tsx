import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Head = ({ className, ...restProps }: Props) => {
  return (
    <thead
      {...restProps}
      className={classNames(withProjectClassNamePrefix('table-head'), className)}
    ></thead>
  );
};
