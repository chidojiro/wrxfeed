import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies, { CookieChangeOptions } from 'universal-cookie';
import { Children } from '../types';

const cookies = new Cookies();

interface ICookieContext {
  changes?: CookieChangeOptions;
  cookies: Cookies;
}

const CookieContext = createContext<ICookieContext>({
  changes: undefined,
  cookies: new Cookies(),
});

export const CookieProvider: React.FC<Children> = ({ children }) => {
  const context = useContext(CookieContext);
  const [changes, setChanges] = useState<CookieChangeOptions>();

  const onCookiesChanged = (changeOptions: CookieChangeOptions) => setChanges(changeOptions);

  useEffect(() => {
    cookies.addChangeListener(onCookiesChanged);
    return () => cookies.addChangeListener(onCookiesChanged);
  }, [setChanges]);

  return (
    <CookieContext.Provider value={{ changes, cookies: context.cookies }}>
      {children}
    </CookieContext.Provider>
  );
};

const useCookie = (): ICookieContext => {
  const context = useContext(CookieContext);

  if (!context) {
    throw new Error('useCookie must be used within an CookieProvider');
  }

  return context;
};

export default useCookie;
