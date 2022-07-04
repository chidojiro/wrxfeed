import React from 'react';
import MainLayout from '@/common/templates/MainLayout';
import { Tabs } from '@/common/components';
import { AllCompany } from './AllCompany';
import { useParams } from 'react-router-dom';
import { ForYouDashboard } from './ForYouDashboard';

export const TargetPage = () => {
  const { slug } = useParams() as Record<string, string>;

  return (
    <MainLayout
      mainClass="px-2 col-span-12 md:!col-span-9 !g:!col-span-9 xl:!col-span-9 !max-w-full"
      rightSide={false}
    >
      <Tabs
        value={slug}
        items={[
          {
            content: <AllCompany />,
            label: 'All Company',
            value: 'all-company',
            href: '/dashboard/all-company',
          },
          {
            content: null,
            label: 'For You',
            value: 'for-you',
            href: '/dashboard/for-you',
          },
        ]}
      ></Tabs>
    </MainLayout>
  );
};
