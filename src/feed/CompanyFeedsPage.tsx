import MainLayout from '@/common/templates/MainLayout';
import { useIdentity } from '@/identity';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Feeds } from './Feeds';

export const CompanyFeedsPage = () => {
  const { pathname } = useLocation();

  const identity = useIdentity();

  useEffect(() => {
    mixpanel.track('Company Feed View', {
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout rightSide={false}>
      <Feeds categoryRedirectHref={(category) => `${pathname}/category/${category.id}`} />
    </MainLayout>
  );
};
