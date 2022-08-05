import React from 'react';

export const useScrollDisable = (disable: boolean) => {
  React.useEffect(() => {
    const header = document.getElementById('app-header');

    if (disable) {
      header?.style.setProperty('padding-right', '15px');
    } else {
      header?.style.removeProperty('padding-right');
    }
  }, [disable]);

  React.useEffect(() => {
    const header = document.getElementById('app-header');

    return () => {
      header?.style.removeProperty('padding-right');
    };
  }, []);
};
