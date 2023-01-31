import { MainLayout } from '@/layout/MainLayout';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const CompanyFeedsPage = () => {
  const { pathname } = useLocation();

  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Company Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    useMixPanelUserProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Feeds
        categoryRedirectHref={(category) => `${pathname}/category/${category.id}`}
        mode="company"
      />
    </MainLayout>
  );
};
