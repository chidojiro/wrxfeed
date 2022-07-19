import React from 'react';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';

export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const Footer = ({ className, ...restProps }: Props) => {
  return (
    <footer
      {...restProps}
      className={clsx(StringUtils.withProjectClassNamePrefix('table-footer'), className)}
    ></footer>
  );
};
