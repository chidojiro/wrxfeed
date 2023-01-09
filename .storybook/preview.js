import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../src/styles.css';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <div style={{ padding: 20, height: '100vh', background: 'white' }}>
      <Router>
        <Story />
      </Router>
      <div id="portal-root"></div>
    </div>
  ),
];
