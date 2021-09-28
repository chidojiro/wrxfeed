import React, { Suspense } from 'react';
// import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@src/styles.css';
import LoadingFallback from '@common/atoms/LoadingFallback';
import NotFoundPage from '@common/pages/NotFoundPage';
import { ApiProvider } from '@api';
import { theme } from '@theme/theme';
import routes from '@src/routes';
import { ProtectedRoute } from '@identity';
import { API_BASE_URL } from '@src/config';
import { ConfirmProvider } from '@src/confirm';
import { CookieProvider } from '@common/hooks/useCookie';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
    <StyledEngineProvider injectFirst>
      <CookieProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RecoilRoot>
              <ApiProvider baseUrl={API_BASE_URL}>
                <ConfirmProvider>
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
                          {/* <DiscussionsPage /> */}
                        </Route>
                      </Switch>
                    </Suspense>
                  </Router>
                </ConfirmProvider>
              </ApiProvider>
            </RecoilRoot>
          </LocalizationProvider>
          <StyledToastContainer />
        </ThemeProvider>
      </CookieProvider>
    </StyledEngineProvider>
  );
};

export default App;
