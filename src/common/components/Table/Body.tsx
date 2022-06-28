import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Body = ({ className, ...restProps }: Props) => {
  return (
    <tbody
      {...restProps}
      className={classNames(withProjectClassNamePrefix('table-body'), className)}
    ></tbody>
  );
};
