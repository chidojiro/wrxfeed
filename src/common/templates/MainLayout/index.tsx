import NavBar from '@/common/organisms/NavBar';
import SideBar from '@/common/organisms/SideBar';
import { Children } from '@/common/types';
import { scrollToTop } from '@/main/utils';
import clsx from 'clsx';
import React from 'react';

type MainLayoutProps = Children & {
  className?: string;
  showNavBar?: boolean;
  rightSide?: boolean;
  mainClass?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showNavBar = true,
  rightSide = true,
  mainClass = '',
}) => {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className={clsx('relative', className ?? '')}>
      {showNavBar && <NavBar />}
      <div className="pt-8 sm:pt-navbar relative z-10">
        <div className="relative min-h-screen max-w-3xl mx-auto md:max-w-[1440px] md:grid md:grid-cols-12">
          <div className="relative hidden md:top-navbar md:sticky md:h-screen md:flex flex-1 md:col-span-3 lg:col-span-3 w-full">
            <SideBar />
          </div>

          <main
            className={clsx(
              'relative pt-10 md:border-l md:border-Gray-11 md:pl-6 md:col-span-8 lg:col-span-8 xl:col-span-6 max-w-3xl',
              'pb-1 sm:pb-10',
              mainClass,
            )}
          >
            {children}
          </main>

          {rightSide && (
            <aside className="hidden xl:block xl:col-span-3 lg:pl-5">
              <div id="main-right-side" className="sticky top-14" />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
