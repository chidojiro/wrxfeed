import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import '../src/styles.css';
import { theme } from '../src/theme';
import { identityState } from '../src/identity';
import { FakeApiProvider } from '../src/api';
import { ConfirmProvider } from '../src/confirm';

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
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RecoilRoot initializeState={initializeTestState}>
          <ConfirmProvider>
            <Router>
              <FakeApiProvider>
                <Story />
              </FakeApiProvider>
            </Router>
          </ConfirmProvider>
        </RecoilRoot>
      </LocalizationProvider>
    </ThemeProvider>
  ),
];
