import { Tabs } from '@/common/components';
import { useMountEffect } from '@/common/hooks';
import { MainLayout } from '@/layout/MainLayout';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useParams } from 'react-router-dom';
import { AllCompany } from './AllCompany';

export const TargetPage = () => {
  const { slug } = useParams() as Record<string, string>;

  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Target Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

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
