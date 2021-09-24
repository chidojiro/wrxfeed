import React from 'react';
import ReactDOM from 'react-dom';
import App from '@common/containers/App';

// if (process.env.NODE_ENV === 'development') {
//   import('../ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
