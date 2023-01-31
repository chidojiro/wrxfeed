import { useMountEffect } from '@/common/hooks';
import { MainLayout } from '@/layout/MainLayout';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const CompanyFeedsPage = () => {
  const { pathname } = useLocation();

  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Company Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

  return (
    <MainLayout>
      <Feeds
        categoryRedirectHref={(category) => `${pathname}/category/${category.id}`}
        mode="company"
      />
    </MainLayout>
  );
};
