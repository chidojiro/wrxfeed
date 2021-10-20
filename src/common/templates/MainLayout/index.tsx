import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="relative">
      <NavBar />
      <div className="pt-navbar pb-10">
        <div className="min-h-screen max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-5">
          <div className="relative hidden lg:block lg:col-span-2 xl:col-span-2">
            <SideBar />
          </div>

          <main className="relative pt-12 lg:border-l lg:border-Gray-11 lg:pl-5 lg:col-span-10 xl:col-span-7">
            {children}
          </main>

          <aside className="hidden xl:block xl:col-span-3">
            <div id="main-right-side" className="sticky top-14" />
          </aside>
        </div>
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
