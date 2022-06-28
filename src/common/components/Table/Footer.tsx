import React from 'react';
import classNames from 'classnames';
import { withProjectClassNamePrefix } from '../../utils';

export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const Footer = ({ className, ...restProps }: Props) => {
  return (
    <footer
      {...restProps}
      className={classNames(withProjectClassNamePrefix('table-footer'), className)}
    ></footer>
  );
};
