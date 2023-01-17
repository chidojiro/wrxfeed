import { Tabs } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import { useParams } from 'react-router-dom';
import { AllCompany } from './AllCompany';

export const TargetPage = () => {
  const { slug } = useParams() as Record<string, string>;

  return (
    <MainLayout>
      <Tabs
        value={slug}
        items={[
          {
            content: <AllCompany />,
            label: 'All Company',
            value: 'all-company',
            href: '/dashboard/all-company',
          },
        ]}
      ></Tabs>
    </MainLayout>
  );
};
