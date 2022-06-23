import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import mixpanel from 'mixpanel-browser';
import App from '@/common/containers/App';
import { BUILD_ENV, MIX_PANEL_PROJECT_TOKEN } from '@/config';

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
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
