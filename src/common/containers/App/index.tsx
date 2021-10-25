import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@src/styles.css';

import LoadingFallback from '@common/atoms/LoadingFallback';
import NotFoundPage from '@common/pages/NotFoundPage';
import { ApiProvider } from '@api';
import routes from '@src/routes';
import { ProtectedRoute } from '@identity';
import { API_BASE_URL } from '@src/config';
import { CookieProvider } from '@common/hooks/useCookie';
import { UploadCSVModal } from '@main/organisms';
import { EmojiPickerContainer } from '@common/molecules/EmojiPicker';
import { NotifyBannerContainer } from '@common/molecules/NotifyBanner';

const StyledToastContainer = () => (
  <ToastContainer
    position="top-center"
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
    <CookieProvider>
      <RecoilRoot>
        <ApiProvider baseUrl={API_BASE_URL}>
          <Router key={Math.random()}>
            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                {Object.values(routes).map((r) => (
                  // Added property`key` to Router to fix warning
                  // when hot reloading Route component
                  <ProtectedRoute
                    key={r.path}
                    path={r.path}
                    component={r.component}
                    permissions={r.permissions}
                    exact
                  />
                ))}
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
        </ApiProvider>
      </RecoilRoot>
    </CookieProvider>
  );
};

export default App;
