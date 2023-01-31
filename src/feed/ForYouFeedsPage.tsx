import { useMountEffect } from '@/common/hooks';
import { MainLayout } from '@/layout/MainLayout';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const ForYouFeedsPage = () => {
  const { pathname } = useLocation();
  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('For You Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

  return (
    <MainLayout>
      <h1 className="sr-only">For you feed</h1>
      <Feeds
        mode="for-you"
        categoryRedirectHref={(category) => `${pathname}/category/${category.id}`}
      />
    </MainLayout>
  );
};
