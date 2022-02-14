import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { classNames } from '@common/utils';
import { scrollToTop } from '@main/utils';

import SideBar from '@common/organisms/SideBar';
import NavBar from '@common/organisms/NavBar';
import SlideOver from '@common/organisms/SlideOver';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavBar?: boolean;
  showSlideOver?: boolean;
}

const MainLayout: React.VFC<MainLayoutProps> = ({
  children,
  className,
  showNavBar = true,
  showSlideOver = true,
}) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className={classNames('relative', className ?? '')}>
      {showNavBar && <NavBar />}
      <div className="pt-8 sm:pt-navbar pb-1 sm:pb-10">
        <div className="relative min-h-screen max-w-3xl mx-auto md:max-w-full md:grid md:grid-cols-12">
          <div className="relative hidden md:top-navbar md:sticky md:h-screen md:flex flex-1 md:col-span-3 lg:col-span-3 w-full">
            <SideBar />
          </div>

          <main className="relative pt-12 md:border-l md:border-Gray-11 md:pl-6 lg:pl-8 xl:pl-20 md:col-span-8 lg:col-span-8 xl:col-span-6">
            {children}
          </main>

          <aside className="hidden xl:block xl:col-span-3 lg:pl-5">
            <div id="main-right-side" className="sticky top-14" />
          </aside>
        </div>
        {showSlideOver && <SlideOver />}
      </div>
    </div>
  );
};

export const MainRightSide: React.FC = ({ children }) => {
  const [isDOMReady, setDOMReady] = useState(false);

  useEffect(() => {
    setDOMReady(true);
  }, []);

  return isDOMReady
    ? ReactDOM.createPortal(children, document.querySelector('#main-right-side') as Element)
    : null;
};

export default MainLayout;
