import React from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { revenueState } from './states';
import RevenueView from '../../atoms/Revenue';

export const LoadableRevenue: React.VFC = () => {
  const { income, outcome } = useRecoilValue(revenueState);
  return <RevenueView income={income} outcome={outcome} />;
};

const Revenue: React.VFC = () => {
  const errorFallbackRender = React.useCallback(() => null, []);
  return (
    <ErrorBoundary fallbackRender={errorFallbackRender}>
      <React.Suspense fallback="">
        <LoadableRevenue />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Revenue;
