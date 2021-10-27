import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { classNames } from '@common/utils';

const BlankLayout: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 m-6 p-6 rounded-md bg-white overflow-scroll',
        className ?? '',
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BlankLayout;
