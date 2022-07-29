import { Tabs } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import { useParams } from 'react-router-dom';
import { AllCompany } from './AllCompany';
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
            content: <ForYouDashboard />,
            label: 'For You',
            value: 'for-you',
            href: '/dashboard/for-you',
          },
        ]}
      ></Tabs>
    </MainLayout>
  );
};
