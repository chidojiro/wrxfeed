import { NotFoundPage } from '@/auth/NotFoundPage';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { EmojiPicker, ErrorBoundary } from '@/common/components';
import { Children } from '@/common/types';
import { UploadCSVModal } from '@/main/organisms';
import { PusherProvider } from '@/push-notification/PusherProvider';
import { Routes } from '@/routing/routes';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot as _RecoilRoot, RecoilRootProps } from 'recoil';
import LoadingFallback from './common/atoms/LoadingFallback';
import { NotifyBannerContainer } from './layout/NotifyBanner';
import { RouteItem } from './routing/types';

import '@/styles.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import 'emoji-mart/css/emoji-mart.css';
import 'react-toastify/dist/ReactToastify.css';

const RecoilRoot = _RecoilRoot as React.FC<RecoilRootProps & Children>;

const StyledToastContainer = () => (
  <ToastContainer
    position="top-center"
    limit={1}
    autoClose={3000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

const { protectedRoutes, publicRoutes } = Object.values(Routes).reduce(
  (acc, cur) => {
    return cur.permissions?.length
      ? { ...acc, protectedRoutes: [...acc.protectedRoutes, cur] }
      : { ...acc, publicRoutes: [...acc.publicRoutes, cur] };
  },
  {
    protectedRoutes: [] as RouteItem[],
    publicRoutes: [] as RouteItem[],
  },
);

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <RecoilRoot>
          <PusherProvider>
            <React.Suspense fallback={<LoadingFallback />}>
              <Switch>
                {publicRoutes.map((route, index) => (
                  <Route key={index} exact {...route} />
                ))}

                {protectedRoutes.map((route, index) => (
                  <ProtectedRoute key={index} exact {...route} permissions={route.permissions} />
                ))}

                <Route exact path="/" component={() => <Redirect to="/dashboard/all-company" />} />
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
            </React.Suspense>
            <UploadCSVModal />
            <StyledToastContainer />
            <EmojiPicker />
            <NotifyBannerContainer topOffset={56} />
          </PusherProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
