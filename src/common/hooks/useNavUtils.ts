import React from 'react';
import { useHistory } from 'react-router-dom';

interface NavigationUtils {
  redirect: (link: string) => void;
  goBack: () => void;
  reload: () => void;
  getLinkProps: (url?: string) => { onClick: () => void };
}

export default function useNavUtils(): NavigationUtils {
  const h = useHistory();
  return React.useMemo(() => {
    const redirect = (link: string) => {
      // set a delay to prevent issue state update on an unmounted component
      setTimeout(() => h.push(link), 10);
    };

    const goBack = () => {
      if (h.length > 0) {
        h.goBack();
        return;
      }
      h.push('/');
    };

    const reload = () => {
      h.go(0);
    };

    const getLinkProps: NavigationUtils['getLinkProps'] = (url) => ({
      // go to specified url or go back
      onClick: url ? () => redirect(url) : goBack,
    });

    return {
      redirect,
      goBack,
      reload,
      getLinkProps,
    };
  }, [h]);
}
