import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import '../src/styles.css';
import { identityState } from '../src/identity';
import { FakeApiProvider } from '../src/api';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewport: MINIMAL_VIEWPORTS,
    defaultViewport: 'mobile1',
  },
};

const initializeTestState = ({ set }) => {
  set(identityState, {
    displayName: 'Admin',
    token: '',
    expireAt: new Date(),
    email: '',
    roles: [],
  });
};

export const decorators = [
  (Story) => (
    <RecoilRoot initializeState={initializeTestState}>
      <Router>
        <FakeApiProvider>
          <Story />
        </FakeApiProvider>
      </Router>
    </RecoilRoot>
  ),
];
