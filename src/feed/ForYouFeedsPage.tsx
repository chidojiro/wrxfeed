import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const ForYouFeedsPage = () => {
  const { pathname } = useLocation();
  const { profile } = useProfile();

  React.useEffect(() => {
    mixpanel.track('For You Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
