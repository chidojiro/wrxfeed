import React from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import mixpanel from 'mixpanel-browser';
import App from './App';
import { BUILD_ENV, MIX_PANEL_PROJECT_TOKEN } from '@/config';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';

Sentry.init({
  dsn: 'https://251baec1d78d4edca442c555ed6da304@o1090039.ingest.sentry.io/6105739',
  integrations: [new Integrations.BrowserTracing()],
  environment: BUILD_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

mixpanel.init(MIX_PANEL_PROJECT_TOKEN, {
  debug: !(BUILD_ENV === 'prod' || BUILD_ENV === 'production'),
});

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!,
);
