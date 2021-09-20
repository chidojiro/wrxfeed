import React from 'react';
import ApiContext from '../contexts/ApiContext';
import { ApiClient } from '../types';

export default function useApi(): ApiClient {
  const contextVal = React.useContext(ApiContext);
  if (!contextVal) {
    throw new Error('This component must be used inside a <ApiProvider> component.');
  }
  return contextVal;
}
