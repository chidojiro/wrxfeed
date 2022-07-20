import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { HOC } from '../common/types';
import { useIdentity } from './hooks';

export default function withAuth<T>(loginUrl = '/login'): HOC<T> {
  const hoc: HOC<T> = (Component: any) => {
    const WithAuth: React.ComponentType<T> = (props) => {
      const identity = useIdentity();
      const location = useLocation();
      const dst = {
        pathname: loginUrl,
        state: { from: location },
      };
      return identity ? <Component {...props} /> : <Redirect to={dst} />;
    };

    WithAuth.displayName = 'WithAuth';
    return WithAuth;
  };
  return hoc;
}
