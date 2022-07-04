import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot as _RecoilRoot, RecoilRootProps } from 'recoil';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@/styles.css';

import LoadingFallback from '@/common/atoms/LoadingFallback';
import NotFoundPage from '@/common/pages/NotFoundPage';
import { ApiProvider } from '@/api';
import { Routes } from '@/routing/routes';
import { ProtectedRoute } from '@/identity';
import { UploadCSVModal } from '@/main/organisms';
import { EmojiPickerContainer } from '@/common/molecules/EmojiPicker';
import { NotifyBannerContainer } from '@/common/molecules/NotifyBanner';
import ContactSupportButton from '@/main/organisms/ContactSupportButton';
import { PusherProvider } from '@/api/containers/PusherProvider';
import { API_BASE_URL } from '@/config';
import { Children } from '@/common/types';

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

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ApiProvider baseUrl={API_BASE_URL}>
        <PusherProvider>
          <Router key={Math.random()}>
            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                {Object.entries(Routes).map(([key, route]) =>
                  route.permissions?.length ? (
                    // Added property`key` to Router to fix warning
                    // when hot reloading Route component
                    <ProtectedRoute key={key} exact {...route} />
                  ) : (
                    <Route key={key} exact {...route} />
                  ),
                )}
                {/* Redirect home to login */}
                <Route key="Home" exact path="/" component={() => <Redirect to="/login" />} />
                {/* 404 homepage */}
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
            </Suspense>
          </Router>
          <UploadCSVModal />
          <StyledToastContainer />
          <EmojiPickerContainer />
          <NotifyBannerContainer topOffset={56} />
          <ContactSupportButton />
        </PusherProvider>
      </ApiProvider>
    </RecoilRoot>
  );
};

export default App;
