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
import NotFoundPage from '@common/pages/NotFoundPage';
import { theme } from '@/theme';
import routes from '@/routes';
import { ProtectedRoute } from '@/identity';
import { ApiProvider } from '@/api';
import { API_BASE_URL } from '@/config';
import { ConfirmProvider } from '@/confirm';
import AuthStateProvider from '@/api/containers/AuthProvider';
import { FirebaseAuth } from '@/firebase/FirebaseAuth';

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
              <AuthStateProvider
                Firebase={
                  new FirebaseAuth({
                    API_KEY: 'AIzaSyCQuBWEYDXnqiYsWrHxZAXfug8Qg8rHTIE',
                    AUTH_DOMAIN: 'arrow-pickup.firebaseapp.com',
                    DATABASE_URL: 'https://arrow-pickup-default-rtdb.firebaseio.com',
                    PROJECT_ID: 'arrow-pickup',
                    STORAGE_BUCKET: 'arrow-pickup.appspot.com',
                    MESSAGING_SENDER_ID: '655599584425',
                    APP_ID: '1:655599584425:web:f5119db147f05ab53b55b8',
                    MEASUREMENT_ID: 'G-VYPTJ334FS',
                  })
                }
              >
                <ConfirmProvider>
                  <Router key={Math.random()}>
                    <Suspense fallback={<LoadingFallback />}>
                      <Switch>
                        {routes.map((r) => (
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
                </ConfirmProvider>
              </AuthStateProvider>
            </ApiProvider>
          </RecoilRoot>
        </LocalizationProvider>
        <ToastContainer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
