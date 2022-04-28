import React from 'react';
import { classNames } from '@common/utils';
import NavBarStatic from '@common/organisms/NavBarStatic';
// import NavBar from '@common/organisms/NavBar';

interface BlankLayoutProps {
  children: React.ReactNode;
  className?: string;
  navBar?: boolean;
}

const BlankLayout: React.VFC<BlankLayoutProps> = ({
  children,
  className,
  navBar = false,
  ...rest
}) => {
  return (
    <div
      className={classNames('fixed inset-0 rounded-md bg-white overflow-scroll', className ?? '')}
      {...rest}
    >
      {navBar && <NavBarStatic />}
      {children}
    </div>
  );
};

export default BlankLayout;
