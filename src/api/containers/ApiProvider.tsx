import React from 'react';
import ApiUtils from '@/api/ApiUtils';
import { setApiClient } from '@/api/utils';
import ApiContext from '@/api/contexts/ApiContext';
import { Children } from '@/common/types';

type ApiProviderProps = Children & {
  baseUrl: string;
};

const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
  const apiClient = new ApiUtils(baseUrl);
  React.useEffect(() => {
    setApiClient(apiClient);
  });
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
