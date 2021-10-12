import React from 'react';
import ApiUtils from '@api/ApiUtils';
import { setApiClient } from '@api/utils';
import ApiContext from '@api/contexts/ApiContext';

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
  // const apiClient = fakeApiUtils;
  // React.useEffect(() => {
  //   setApiClient(apiClient);
  // });
  return <ApiContext.Provider value={undefined}>{children}</ApiContext.Provider>;
};
