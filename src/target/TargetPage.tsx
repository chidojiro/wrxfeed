import { Tabs } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AllCompany } from './AllCompany';

export const TargetPage = () => {
  const { slug } = useParams() as Record<string, string>;

  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Target Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    useMixPanelUserProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
