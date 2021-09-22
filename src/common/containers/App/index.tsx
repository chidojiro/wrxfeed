import React, { Suspense } from 'react';
// import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles.css';
import LoadingFallback from '@common/atoms/LoadingFallback';
// import NotFoundPage from '@common/pages/NotFoundPage';
import OverviewPage from '@home/pages/OverviewPage';
import { theme } from '@/theme';
// import routes from '@/routes';
// import { ProtectedRoute } from '@/identity';
import { ApiProvider } from '@/api';
import { API_BASE_URL } from '@/config';
import { ConfirmProvider } from '@/confirm';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RecoilRoot>
            <ApiProvider baseUrl={API_BASE_URL}>
              <ConfirmProvider>
                <Router key={Math.random()}>
                  <Suspense fallback={<LoadingFallback />}>
                    <Switch>
                      {/* {routes.map((r) => (
                        // Added property`key` to Router to fix warning
                        // when hot reloading Route component
                        <ProtectedRoute
                          key={r.path}
                          path={r.path}
                          component={r.component}
                          permissions={r.permissions}
                          exact
                        />
                      ))} */}
                      {/* 404 homepage */}
                      <Route>
                        {/* <NotFoundPage /> */}
                        <OverviewPage />
                        {/* <div style={{ width: 100, height: 100, backgroundColor: 'red' }} /> */}
                      </Route>
                    </Switch>
                  </Suspense>
                </Router>
              </ConfirmProvider>
            </ApiProvider>
          </RecoilRoot>
        </LocalizationProvider>
        <ToastContainer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
