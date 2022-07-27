import MainLayout from '@/common/templates/MainLayout';
import { useIdentity } from '@/identity/hooks';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const ForYouFeedsPage = () => {
  const { pathname } = useLocation();
  const identity = useIdentity();

  React.useEffect(() => {
    mixpanel.track('For You Feed View', {
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout className="flex flex-col" rightSide={false}>
      <h1 className="sr-only">For you feed</h1>
      <Feeds
        forYou={1}
        categoryRedirectHref={(category) => `${pathname}/category/${category.id}`}
      />
    </MainLayout>
  );
};
