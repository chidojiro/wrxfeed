import { MainLayout } from '@/layout/MainLayout';
import React from 'react';
import { InsightHeader } from './InsightHeader';

export type InsightPageProps = {
  //
};

export const InsightPage = ({}: InsightPageProps) => {
  return (
    <MainLayout>
      <InsightHeader />
    </MainLayout>
  );
};
