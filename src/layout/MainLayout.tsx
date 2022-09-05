import { Children } from '@/common/types';
import { scrollToTop } from '@/main/utils';
import clsx from 'clsx';
import React from 'react';
import { NavBar } from './NavBar';
import { SideBar } from './SideBar';

type MainLayoutProps = Children;

export const MainLayout = ({ children }: MainLayoutProps) => {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="relative">
      <NavBar />
      <div className="pt-8 sm:pt-navbar relative z-10">
        <div className="relative min-h-screen mx-auto md:max-w-[1440px] flex">
          <div className="relative hidden md:top-navbar md:sticky md:h-screen md:flex">
            <SideBar />
          </div>

          <main
            className={clsx(
              'relative',
              'md:border-l md:border-Gray-11',
              'w-screen py-10 px-2 md:px-6',
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
