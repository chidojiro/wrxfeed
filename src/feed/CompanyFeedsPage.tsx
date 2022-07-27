import MainLayout from '@/common/templates/MainLayout';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const CompanyFeedsPage = () => {
  const { pathname } = useLocation();

  const { data: profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Company Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout rightSide={false}>
      <Feeds categoryRedirectHref={(category) => `${pathname}/category/${category.id}`} />
    </MainLayout>
  );
};
