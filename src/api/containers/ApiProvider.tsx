import React from 'react';
import ApiUtils, { fakeApiUtils } from '../ApiUtils';
import ApiContext from '../contexts/ApiContext';
import { setApiClient } from '../utils';

interface ApiProviderProps {
  baseUrl: string;
}

const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
  const apiClient = new ApiUtils(baseUrl);
  React.useEffect(() => {
    setApiClient(apiClient);
  });
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};

export default ApiProvider;

export const FakeApiProvider: React.FC = ({ children }) => {
  const apiClient = fakeApiUtils;
  React.useEffect(() => {
    setApiClient(apiClient);
  });
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};
